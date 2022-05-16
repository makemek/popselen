import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LeaderboardService } from "src/leaderboard/leaderboard.service";
import { IpCountry } from "./ipCountry.decorator";
import { PopDto } from "./pop.dto";
import { PopService } from "./pop.service";
import { reCaptchaGuard } from "./recaptcha.guard";

@Controller("pop")
export class PopController {
  constructor(
    private readonly popService: PopService,
    private readonly leaderboardGateway: LeaderboardService,
  ) {}

  @Post()
  @UseGuards(reCaptchaGuard("pop"))
  async pop(@Body() popDto: PopDto, @IpCountry() country: string) {
    await this.popService.add(country, popDto.count);
    this.leaderboardGateway.broadcastCountry(country); // MAYDO: use pub-sub like sqs or bullmq for scaleability
  }
}
