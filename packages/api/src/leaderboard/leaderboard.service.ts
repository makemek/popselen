import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from "@node-redis/client";
import { REDIS_CON } from "src/redis/dbConnection";
import { LeaderboardGateway } from "./leaderboard.gateway";
import { mapValues, parseInt } from "lodash";

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject(REDIS_CON)
    private readonly redis: RedisClientType,
    private readonly leaderboardGateway: LeaderboardGateway,
  ) {}

  async broadcastCountry(country: string) {
    const amount = await this.redis.hGet("selen", country);
    this.leaderboardGateway.broadcast({ country, value: Number(amount) });
  }

  async leaderboard() {
    const valuesByCountry = await this.redis.hGetAll("selen");

    return mapValues(valuesByCountry, parseInt);
  }
}
