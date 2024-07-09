import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment, PaymentSchema } from './entities/payment.entity';
import {
  Reservation,
  ReservationSchema,
} from 'src/reservations/entities/reservation.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Motor, MotorSchema } from 'src/motor/entities/motor.entity';
import { Storage, StorageSchema } from 'src/storage/entities/storage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Reservation.name, schema: ReservationSchema },
      { name: User.name, schema: UserSchema },
      { name: Motor.name, schema: MotorSchema },
      { name: Storage.name, schema: StorageSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
