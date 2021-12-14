import { Injectable } from '@nestjs/common';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { UserModel } from 'src/users/models/user.model';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {

    constructor(private readonly configService: ConfigService) {

    }

    createSequelizeOptions(): SequelizeModuleOptions {
        return {
            dialect: 'postgres',
            host: this.configService.get(Configuration.DB_HOST),
            port: parseInt(this.configService.get(Configuration.DB_PORT)),
            username: this.configService.get(Configuration.DB_USER),
            password: this.configService.get(Configuration.DB_PASS),
            database: this.configService.get(Configuration.DB_DATABASE),
            autoLoadModels: true,
            synchronize: true,
            retryDelay: 5000,
            retryAttempts: 10,
            models: [ UserModel ]
        };
    }

}