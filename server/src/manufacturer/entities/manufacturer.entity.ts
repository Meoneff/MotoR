import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManufacturerDocument = HydratedDocument<Manufacturer>;

@Schema({ timestamps: true })
export class Manufacturer {
  @Prop({ required: true, unique: true })
  manufacturerId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  quantity: number;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);
