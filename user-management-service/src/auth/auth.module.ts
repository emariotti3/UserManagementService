import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [ 
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: env.APP_KEY,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
  exports: [ AuthService ]
})
export class AuthModule {}
