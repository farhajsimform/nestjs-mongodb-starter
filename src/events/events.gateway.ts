import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: any): Promise<number> {
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
