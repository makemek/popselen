import { Controller, Get } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  leaderboard() {
    return this.leaderboardService.leaderboard();
  }
}
