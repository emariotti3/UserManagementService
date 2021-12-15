import { Logger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { UserModel } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UtilsService } from '../utils/utils.service';
import { UserProfile } from './interfaces/user-profile.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(private sequelize: Sequelize) {}

  /**
   * Returns a list with all the registered users.
   * @returns {Promise<UserModel[]>} - A list of users.
   */
  getUsers(): Promise<UserModel[]> {
    return this.sequelize.query("SELECT id, username FROM users", 
    { 
      type: QueryTypes.SELECT,
      model: UserModel, 
      mapToModel: true
    });
  }

  /**
   * Creates a new user profile, given a user. 
   * @param {CreateUserDto} newUser - Represents a new user's data.
   */
  async createUser(newUser: CreateUserDto): Promise<void> {

    const hashedPwd = UtilsService.hashPassword(newUser.password);

    const createUserQuery = "INSERT INTO users(username, password) VALUES ($username, $pwd) RETURNING id";
    const createAddressQuery = "INSERT INTO addresses(city_id, street) VALUES ($cityId, $street) RETURNING id";
    const createProfileQuery =  "INSERT INTO profiles(user_id, address_id, name) VALUES ($userId, $addressId, $name)";

    return this.sequelize.transaction().then(tx => {
        return this.sequelize.query(createUserQuery, { 
          type: QueryTypes.INSERT,
          bind: { username: newUser.username, pwd: hashedPwd },
          plain: true,
          transaction: tx
        }).then(result => {

          this.logger.log(`Created user ${result[0]['id']}!`);

          const userId: number = result[0]['id'];
          const promiseAddressId = this.sequelize.query(createAddressQuery, { 
              type: QueryTypes.INSERT,
              bind: { cityId: newUser.cityId, street: newUser.street },
              plain: true,
              transaction: tx
          });

          return Promise.all([userId, promiseAddressId]).then((result) => {

            const createdUserId = result[0];
            const createdAddressId = result[1][0]['id'];

            this.logger.log(`Created address ${createdAddressId} for user ${createdUserId}!`);
  
            return this.sequelize.query(createProfileQuery, { 
              type: QueryTypes.INSERT,
              bind: { userId: createdUserId, addressId: createdAddressId, name: newUser.name },
              transaction: tx
            }).then(function () {
              //this.logger.log(`Successfully created user ${newUser.username}: Committing transaction.`);
              return tx.commit();
            })
          });
        }).catch(error => {
          this.logger.error(`Error creating user ${newUser.username}: ${error}. Executing transaction rollback.`);
          tx.rollback();
          throw new InternalServerErrorException({
            error: `Error creating user ${newUser.username}: ${error}` 
          })
        });
      });
  }

  /**
   * Finds and returns the user with the provided username.
   * @param {string} username - The username to be used for the search.
   * @returns {Promise<User | undefined>} - A user's data, if a matching record is found, or null otherwise.
   */
  findOne(username: string): Promise<User | undefined> {
    try {

      const getUserQuery = "SELECT * FROM users WHERE username = $username LIMIT 1";

      return this.sequelize.query(getUserQuery, 
        { 
          type: QueryTypes.SELECT,
          plain: true,
          bind: { username: username }
      }).then(user => {
        
        if (!user) {
          return null;
        }

        return {'id': user['id'], 'username': user['username'], 'password': user['password']}
      });

    } catch (error) {
      this.logger.error(`Error occurred attempting to fetch user ${username}. ${error}`);
      throw error;
    }
  }

  /**
   * Finds and returns a user's profile information given username.
   * @param {string} username - The username to be used for the search.
   * @returns {Promise<UserProfile>} - A user's profile information, if a matching record is found.
   */
  getUserProfile(username: string): Promise<UserProfile> {
    try {
      const getUserProfileQuery = 
      "SELECT u.id as id, p.name as name, a.street as street, cities.name as city, countries.name as country \
      FROM users u \
      INNER JOIN profiles p ON u.id = p.user_id INNER JOIN addresses a ON a.id = p.address_id \
      INNER JOIN cities ON cities.id = a.city_id INNER JOIN countries ON countries.id = cities.country_id \
      WHERE u.username = $username";

      return this.sequelize.query(getUserProfileQuery, 
      { 
        type: QueryTypes.SELECT,
        plain: true,
        bind: { username: username }
      }).then(profileInfo => {

        if (!profileInfo) {
          this.logger.error(`No profile found for username ${username}`);
          throw new NotFoundException('No profile found for provided username!');
        }

        const userProfile = { 
          'id': profileInfo['id'], 
          'name': profileInfo['name'], 
          'address': { 
            'street': profileInfo['street'], 
            'city': profileInfo['city'], 
            'country': profileInfo['country'] 
          } 
        };

        return userProfile;
      });

    } catch(error) {
      this.logger.error(`Error occurred while attempting to retrieve user profile information for user ${username}: ${error}`);
      throw new InternalServerErrorException({
        error: `Error fetching user profile for ${username}. ${error}` 
      });
    }
  }

}
