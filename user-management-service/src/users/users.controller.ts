import { Body, Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfile } from './interfaces/userProfile.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
   * Given a valid jwt token returns the authenticated user's profile.
   * An authentication header with valid credentials must be provided
   * to access the desired user profile.
   * @param params 
   * @returns a UserProfile.
   */
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@Request() req): Promise<UserProfile> {
    return this.usersService.getUserProfile(req.user.username);
  }
}