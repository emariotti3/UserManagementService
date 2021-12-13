import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {  UserCredentialsDto } from './dto/user-credentials.dto';
import { UserProfile } from './interfaces/userProfile.interface';
import { UserToken } from './interfaces/userToken.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user profile in the database.
   * @param newUser the user to be created.
   */
  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<void> {
    return this.usersService.createUser(newUser);
  }

  /**
   * Logs a user into the system, given a username and password.
   * @param userCredentials a set of credentials: username and password to authenticate the user with. 
   * @returns an authentication token to be used in subsequent requests.
   */
  @Post('login')
  loginUser(@Body() userCredentials: UserCredentialsDto): Promise<UserToken> {
    return this.usersService.loginUser(userCredentials);
  }

  /*@Post('logout')
  logout(): string {
    return this.usersService.getUsers();
  }*/

  /**
   * Given a username, returns the matching username's user profile.
   * An authentication header with valid credentials must be provided
   * to access the desired user profile.
   * @param params 
   * @returns a UserProfile.
   */
  @Get(':username')
  // @Header('Authorization', 'none')
  getUserProfile(@Param() params): Promise<UserProfile> {
    return this.usersService.getUserProfile(params.username);
  }
}