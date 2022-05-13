import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PopService } from './pop.service';
import { RedisModule } from '../redis/redis.module';
import { PopController } from './pop.controller';
import { PopGateway } from './pop.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
  ],
  controllers: [PopController],
  providers: [PopService, PopGateway],
})
export class PopModule {}
