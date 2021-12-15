import { Body, Controller, Get, UseGuards, Request, Post, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserProfile } from './interfaces/user-profile.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RedisCacheService } from 'src/cache/redis.service';

@Controller('users')
export class UsersController {

  private readonly logger = new Logger(UsersController.name);
  
  constructor(
    private cacheManager: RedisCacheService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Creates a new user profile.
   * @param {CreateUserDto} newUser - The user to be created.
   */
  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<void> {
    return this.usersService.createUser(newUser);
  }

  /**
   * Given a request that includes a valid jwt token header, returns the authenticated user's profile.
   * An authentication header with valid credentials must be provided
   * to access this route.
   * @param {Request} req - A request object that includes a user field with the required profile's username.
   * @returns {UserProfile} - A user profile.
   * @throws {UnauthorizedException} if an expired or invalid jwt token is provided.
   */
  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@Request() req): Promise<UserProfile> {
    const username = req.user.username;
    const requestKey = req.path + ' ' + username;

    let cachedProfile = await this.cacheManager.get(requestKey);
    if (Boolean(cachedProfile)) {
      return { 'id': cachedProfile['id'], 'name': cachedProfile['name'], 'address': cachedProfile['address'] };
    } 

    this.logger.log('Fetch profile for user ' + username);

    let userProfile = await this.usersService.getUserProfile(username);
    this.cacheManager.set(requestKey, userProfile);
    return userProfile;
  }
}