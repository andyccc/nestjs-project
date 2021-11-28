import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class CacheService {
    public client;
    constructor(private redisService: RedisService) {
        this.getClient();
    }
    async getClient() {
        this.client = await this.redisService.getClient()
    }

    // set value method
    async set(key: string, value: any, seconds?: number) {
        value = JSON.stringify(value);
        if (!this.client) {
            await this.getClient();
        }
        if (!seconds) {
            await this.client.set(key, value);
        } else {
            await this.client.set(key, value, 'EX', seconds);
        }
    }

    // get value method
    async get(key: string) {
        if (!this.client) {
            await this.getClient();
        }
        var data = await this.client.get(key);
        if (!data) return;
        return JSON.parse(data);
    }
}

/*
eg :

await this.cache.set('username','zhangsan');
await this.cache.get('username')


*/