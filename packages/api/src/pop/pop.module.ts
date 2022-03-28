import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PopService } from './pop.service';
import { RedisModule } from '../redis/redis.module';
import { PopController } from './pop.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
  ],
  controllers: [PopController],
  providers: [PopService],
})
export class PopModule {}
