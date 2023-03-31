import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Chat } from 'src/mongoose/schema/chat.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: mongoose.Model<Chat>,
  ) {}

  async handleUsersChat(userPyaload: any, chatPayload: any) {
    const data = await this.chatModel.create({
      sendby: userPyaload._id,
      message: chatPayload.message,
    });
    const getChatData = await this.chatModel
      .findById(data._id, {
        message: 1,
        _id: 1,
        createdAt: 1,
        roomID: 1,
      })
      .populate({
        path: 'sendby',
        select: {
          fullname: 1,
          email: 1,
          picture: 1,
        },
      });
    return getChatData;
  }
}
