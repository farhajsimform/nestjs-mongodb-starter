import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
