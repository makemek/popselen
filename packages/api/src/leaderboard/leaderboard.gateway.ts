import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export interface LeaderboardUpdate {
  country: string;
  value: number;
}

@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
  path: '/sock/pop',
})
export class LeaderboardGateway {
  @WebSocketServer()
  server: Server;

  broadcast(leaderboard: LeaderboardUpdate) {
    this.server.emit('leaderboard', leaderboard);
  }
}
