import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PopDto } from './pop.dto';
import { PopService } from './pop.service';
import { reCaptchaGuard } from './recaptcha.guard';

@Controller()
export class AppController {
  constructor(private readonly popService: PopService) {}

  @Post('pop')
  @UseGuards(reCaptchaGuard('pop'))
  async pop(@Body() popDto: PopDto) {
    // TODO get country from ip address
    await this.popService.add('th', popDto.count);
  }

  @Get('leaderboard')
  async leaderboard() {
    return this.popService.leaderboard();
  }
}
