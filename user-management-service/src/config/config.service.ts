import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

export class ConfigService {

    private readonly envConfig: {
        [key: string]: string
    };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV != "production";

        if (isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env';
            const existsPath  = existsSync(envFilePath);

            if (!existsPath) {
                console.log('.env file does not exist');
                process.exit(0);
            }

            // Read .env file
            this.envConfig = parse(readFileSync(envFilePath));
        } else {
            this.envConfig = {
                PORT: process.env.PORT,
            }
        }
    }

    /**
     * Given a config variable name, returns its assigned value
     * depending on the environment.
     * @param {string} key The name of the desired config variable.
     * @returns {string} The desired variable's value.
     */
    get(key: string): string {
        return this.envConfig[key];
    }

}