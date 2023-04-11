import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from './post.schema';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  SUBADMIN = 'subadmin',
  MODERATOR = 'moderator',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ maxlength: 35 })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  profilepic: string;

  @Prop({ default: 'user' })
  role: Role;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  posts: Post;
}

export const UserSchema = SchemaFactory.createForClass(User);
