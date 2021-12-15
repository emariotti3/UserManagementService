import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { RedisCacheModule } from 'src/cache/redis.module';

@Module({
  imports: [ 
    SequelizeModule.forFeature([ UserModel ]), 
    RedisCacheModule 
  ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports: [ UsersService ]
})
export class UsersModule {}
