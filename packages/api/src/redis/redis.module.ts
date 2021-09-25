/**
 * There is no nestjs module for node-redis v4 yet at the time of this writting.
 * Let's create a basic one.
 *
 * I picked node-redis over ioredis is because it has better performance according to
 * https://github.com/poppinlp/node_redis-vs-ioredis
 * node-redis v4 now supports promise which is a huge plus.
 */

import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis/dist/lib/client';
import { dbConnectionFactory, REDIS_CON } from './dbConnection';

@Global()
@Module({
  providers: [dbConnectionFactory],
  exports: [dbConnectionFactory],
})
export class RedisModule implements OnModuleDestroy {
  constructor(
    @Inject(REDIS_CON)
    private readonly client: RedisClientType,
  ) {}

  async onModuleDestroy() {
    await this.client.disconnect();
  }
}
