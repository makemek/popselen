import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@Injectable()
@WebSocketGateway({
  transports: ['websocket'],
  path: '/sock/pop',
})
export class PopGateway {
  @SubscribeMessage('pop')
  handleEvent(@MessageBody() data: string) {
    console.log(data);
    return;
  }
}
