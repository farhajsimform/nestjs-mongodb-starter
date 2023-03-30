import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from './gaurd/events.gaurd';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('chat')
  async identity(@MessageBody() data: any): Promise<any> {
    console.log(data);
    return data;
  }

  @SubscribeMessage('join')
  createRoom(socket: Socket, roomid: string): WsResponse<any> {
    socket.join(roomid);
    socket.to(roomid).emit('roomCreated', { room: roomid });
    return;
  }
}
