/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true })
  categoryId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
