/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  uid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmPassword: string;

  @Prop({ required: true })
  name: string;

  @Prop({})
  avatar: string;

  @Prop({})
  phone: string;

  @Prop({})
  Adress: string;

  @Prop({})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
