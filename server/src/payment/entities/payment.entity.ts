import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  paymentId: string;

  @Prop({ required: true })
  dayPayment: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
  })
  reservationId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customerId: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  isPaid: boolean;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  paymentMethod: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
