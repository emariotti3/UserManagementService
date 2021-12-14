import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Given a set of credentials: username and password, 
   * validate that they correspond to an existing user.
   * @param {string} username 
   * @param {string} password 
   * @returns A user's data, if validation is successful.
   * @throws {UnauthorizedException} - If invalid credentials were provided. 
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}