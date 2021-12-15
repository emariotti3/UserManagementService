import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';

@Module({
  imports: [ 
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get(Configuration.APP_KEY),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    }),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
  exports: [ AuthService ]
})
export class AuthModule {}
