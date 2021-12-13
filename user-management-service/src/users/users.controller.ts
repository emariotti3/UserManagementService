import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserProfile } from './interfaces/userProfile.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<void> {
    return this.usersService.createUser(newUser);
  }

  @Post('login')
  loginUser(@Body() requestBody: Body): string {
    //console.log(requestBody);
    return this.usersService.loginUser();
  }

  /*@Post('logout')
  logout(): string {
    return this.usersService.getUsers();
  }*/

  @Get(':username')
  // @Header('Authorization', 'none')
  getUserProfile(@Param() params): Promise<UserProfile> {
    return this.usersService.getUserProfile(params.username);
  }
}