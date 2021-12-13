import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UtilsService } from '../utils/utils.service';
import { UserProfile } from './interfaces/userProfile.interface';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserToken } from './interfaces/userToken.interface';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserModel) private userModel: typeof UserModel, 
    private sequelize: Sequelize,
    private utils: UtilsService) {}

  getUsers(): Promise<UserModel[]> {
    return this.sequelize.query("SELECT id, username FROM users", 
    { 
      type: QueryTypes.SELECT,
      model: UserModel, 
      mapToModel: true
    });
  }

  async createUser(newUser: CreateUserDto): Promise<void> {

    const hashedPwd = this.utils.hashPassword(newUser.password);

    // TODO: validate street, name and username
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

          console.log(`Created user ${result[0]['id']}!`);

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

            console.log(`Created address ${createdAddressId} for user ${createdUserId}!`);
  
            return this.sequelize.query(createProfileQuery, { 
              type: QueryTypes.INSERT,
              bind: { userId: createdUserId, addressId: createdAddressId, name: newUser.name },
              transaction: tx
            }).then(function () {
              console.log(`Successfully created user ${newUser.username}: Committing transaction.`);
              return tx.commit();
            }).catch(function (err) {
              console.error(`Error creating user ${newUser.username}: ${err}. Executing transaction rollback.`);
              return tx.rollback();
            });
          })
        })
      });

  }



  loginUser(userCredentials: UserCredentialsDto): Promise<UserToken> {
    try {

      const getUserQuery = "SELECT username, password FROM users WHERE username = $username";

      return this.sequelize.query(getUserQuery, 
        { 
          type: QueryTypes.SELECT,
          plain: true,
          bind: { username: userCredentials.username }
      }).then(user => {

        if (!user) {
          console.error(`Error occurred attempting to login user: no matching user found for username ${userCredentials.username}!`);
          throw new UnauthorizedException(`No matching user found for username ${userCredentials.username}!`)
        }

        if (user['password'] != this.utils.hashPassword(userCredentials.password)) {
          console.error(`Error occurred attempting to login user ${userCredentials.username}: password did not match!`);
          throw new UnauthorizedException('Invalid password!')
        }

        return this.utils.generateJWT(userCredentials);
      });

    } catch (error) {
      console.error(`Error occurred attempting to login user ${userCredentials.username}: ${error}`);
      throw error;
    }
  }



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
      console.error(`Error occurred while attempting to retrieve user profile information for user ${username}: ${error}`);
      throw error;
    }
  }

}
