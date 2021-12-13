import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users/models/user.model';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ 
    // TODO: fix this config, make it dynamic like config.js
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 5432,
      username: 'my_user',
      password: 'password123',
      database: 'my_database',
      autoLoadModels: true,
      synchronize: true,
      retryDelay: 5000,
      retryAttempts: 10,
      models: [ UserModel ]
    }),
    UsersModule,
    UtilsModule 
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController);
  }
}