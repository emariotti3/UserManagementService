import { Controller, UseGuards, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccessToken } from './interfaces/access-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Expects a request containing a user's credentials: username and password.
   * @param user - A structure containing a user's credentials.
   * @returns {AccessToken} a valid jwt access token.
   * @throws {UnauthorizedException} if invalid user credentials are provided.
   */
   @UseGuards(LocalAuthGuard)
   @Post('/login')
   async login(@Body() user): Promise<AccessToken> {
    return this.authService.login(user)
  }

}