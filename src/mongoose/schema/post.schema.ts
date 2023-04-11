import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Comment } from './comment.schema';

@Schema({
  timestamps: true,
})
export class Post extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  postedBy: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  likes: User;

  @Prop({ default: 0 })
  likesCount: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: Comment;

  @Prop({
    required: true,
    minlength: [0, 'Comment should be greater than 0 characters'],
    maxlength: [1000000, 'Comment should be less than 1000000 characters'],
  })
  content: string;

  @Prop()
  images: mongoose.Schema.Types.Array;
}

export const PostSchema = SchemaFactory.createForClass(Post);
