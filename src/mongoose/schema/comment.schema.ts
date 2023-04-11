import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  commentedBy: User;

  @Prop({
    required: true,
    minlength: [0, 'Comment should be greater than 0 characters'],
    maxlength: [100000, 'Comment should be less than 100000 characters'],
  })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
