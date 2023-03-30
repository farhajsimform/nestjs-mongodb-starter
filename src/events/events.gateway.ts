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
  async chat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ): Promise<any> {
    client.emit('chat', 'test');
    return data;
  }

  @SubscribeMessage('join')
  createRoom(socket: Socket, roomid: string): WsResponse<any> {
    socket.join(roomid);
    socket.to(roomid).emit('roomCreated', { room: roomid });
    return;
  }
}
