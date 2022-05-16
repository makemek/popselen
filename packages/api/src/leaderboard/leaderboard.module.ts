import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardGateway } from "./leaderboard.gateway";
import { LeaderboardService } from "./leaderboard.service";

@Module({
  imports: [RedisModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardGateway, LeaderboardService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
