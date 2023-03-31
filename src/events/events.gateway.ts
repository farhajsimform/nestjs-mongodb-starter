import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { WsGuard } from './gaurd/events.gaurd';

interface ISocket extends Socket {
  user: any;
}
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private eventsService: EventsService) {}
  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('SEND_MESSAGE')
  async chat(
    @ConnectedSocket() client: ISocket,
    @MessageBody() message: any,
  ): Promise<any> {
    const data = await this.eventsService.handleUsersChat(client.user, {
      message,
    });
    client.emit('RECIVED_MESSAGE', data);
    return data;
  }

  @SubscribeMessage('join')
  createRoom(socket: Socket, roomid: string): WsResponse<any> {
    socket.join(roomid);
    socket.to(roomid).emit('roomCreated', { room: roomid });
    return;
  }
}
