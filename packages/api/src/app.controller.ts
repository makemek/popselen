import { Body, Controller, Get, Post } from '@nestjs/common';
import { PopDto } from './pop.dto';
import { PopService } from './pop.service';

@Controller()
export class AppController {
  constructor(private readonly popService: PopService) {}

  @Post('pop')
  async pop(@Body() popDto: PopDto) {
    // TODO get country from ip address
    await this.popService.add('th', popDto.count);
  }

  @Get('leaderboard')
  leaderboard() {
    return this.popService.leaderboard();
  }
}
