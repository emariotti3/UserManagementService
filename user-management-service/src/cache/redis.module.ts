import { CacheModule, CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import type { ClientOpts as RedisClientOpts } from 'redis';
import { ConfigService } from 'src/config/config.service';

import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis.service';
import { Cache } from 'cache-manager';
import { Configuration } from 'src/config/config.keys';


@Module({
    imports: [
        CacheModule.registerAsync<RedisClientOpts>({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    store: redisStore,
                    host: configService.get(Configuration.REDIS_HOST),
                    port: configService.get(Configuration.REDIS_PORT),
                    ttl: configService.get(Configuration.REDIS_TTL)
                }
            }
        })
    ],
    providers: [ RedisCacheService ],
    exports: [
        CacheModule,
        RedisCacheService
    ]
})
export class RedisCacheModule {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache
    ){}
}