import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LeaderboardModule } from "./leaderboard/leaderboard.module";
import { PopModule } from "./pop/pop.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PopModule,
    LeaderboardModule,
  ],
})
export class AppModule {}
