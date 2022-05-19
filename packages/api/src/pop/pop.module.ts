import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PopService } from "./pop.service";
import { RedisModule } from "../redis/redis.module";
import { PopController } from "./pop.controller";
import { LeaderboardModule } from "../leaderboard/leaderboard.module";
import { RecaptchaModule } from "../google-recaptcha/recaptcha.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    LeaderboardModule,
    RecaptchaModule,
  ],
  controllers: [PopController],
  providers: [PopService],
})
export class PopModule {}
