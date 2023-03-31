import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Chat, ChatSchema } from 'src/mongoose/schema/chat.schema';
import { User, UserSchema } from 'src/mongoose/schema/user.schema';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [EventsGateway, AuthService, JwtService, EventsService],
})
export class EventsModule {}
