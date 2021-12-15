import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";

import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {

    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
    ){}

    public async get(key: string) {
        return this.cacheManager.get(key);
    }

    public async set(key: string, value: object) {
        return this.cacheManager.set(key, value);
    }

    public async del(key: string) {
        return this.cacheManager.del(key);
    }

}