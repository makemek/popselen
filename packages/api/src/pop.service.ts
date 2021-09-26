import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { REDIS_CON } from './redis/dbConnection';
import { mapValues, parseInt } from 'lodash';

@Injectable()
export class PopService {
  constructor(
    @Inject(REDIS_CON)
    private readonly redis: RedisClientType,
  ) {}

  add(country: string, amount: number) {
    return this.redis.hIncrBy('selen', country, amount);
  }

  async leaderboard() {
    const valuesByCountry = await this.redis.hGetAll('selen');

    return mapValues(valuesByCountry, parseInt);
  }
}
