import { Body, Controller, Get, Post } from '@nestjs/common';
import { PopDto } from './pop.dto';
import { PopService } from './pop.service';

@Controller('pop')
export class PopController {
  constructor(private readonly popService: PopService) {}

  @Post()
  async pop(@Body() popDto: PopDto) {
    // TODO get country from ip address
    await this.popService.add('th', popDto.count);
  }

  @Get()
  async leaderboard() {
    return this.popService.leaderboard();
  }
}
