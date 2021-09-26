import { Controller, Get, Post } from '@nestjs/common';
import { PopService } from './pop.service';

@Controller()
export class AppController {
  constructor(private readonly popService: PopService) {}

  @Post('pop')
  pop() {
    return this.popService.add('th', 0);
  }

  @Get('leaderboard')
  leaderboard() {
    return this.popService.leaderboard();
  }
}
