import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MotorDocument = HydratedDocument<Motor>;

@Schema({ timestamps: true })
export class Motor {
  @Prop({ required: true, unique: true })
  motorId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true,
  })
  manufacturerId: string;

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // })
  // ownerId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Storage',
    required: true,
  })
  image: string;

  @Prop({ required: true })
  status: boolean;
}
export const MotorSchema = SchemaFactory.createForClass(Motor);
