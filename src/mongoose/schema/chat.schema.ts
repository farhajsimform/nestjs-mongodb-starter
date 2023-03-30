import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Chat extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sendby: User;

  @Prop({
    required: true,
    minlength: [0, 'message should be greater than 0 characters'],
    maxlength: [100000, 'message should be less than 100000 characters'],
  })
  message: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
