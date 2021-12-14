import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UtilsService } from '../utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './interfaces/access-token.interface';
import { ValidatedUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

    /**
   * Given a set of credentials: username and password, 
   * check that a user with that username exists and that
   * their stored password matches the given password.
   * @param {string} username 
   * @param {string} password 
   * @returns A user's data, if validation is successful.
   * @throws {UnauthorizedException} - If invalid credentials are provided. 
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === UtilsService.hashPassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Given some user data, return a valid jwt token using the data as payload.
   * @param {ValidatedUserDto} user - A structure containing a validated user's data.
   * @returns {AccessToken} a valid, signed jwt token.
   */
  async login(user: ValidatedUserDto): Promise<AccessToken> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}