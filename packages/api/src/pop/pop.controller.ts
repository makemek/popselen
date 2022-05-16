import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IpCountry } from './ipCountry.decorator';
import { PopDto } from './pop.dto';
import { PopService } from './pop.service';
import { reCaptchaGuard } from './recaptcha.guard';

@Controller('pop')
export class PopController {
  constructor(private readonly popService: PopService) {}

  @Post()
  @UseGuards(reCaptchaGuard('pop'))
  async pop(@Body() popDto: PopDto, @IpCountry() country: string) {
    await this.popService.add(country, popDto.count);
  }

  @Get()
  async leaderboard() {
    return this.popService.leaderboard();
  }
}
