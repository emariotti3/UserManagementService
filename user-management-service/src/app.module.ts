import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './db/sequelize.service';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ 
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService
    }),
    AuthModule,
    UsersModule,
    UtilsModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule implements NestModule {

  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Configuration.PORT);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController);
  }
}