import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/mongoose/schema/chat.schema';
import { User, UserSchema } from 'src/mongoose/schema/user.schema';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
