import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentSchema } from './entities/payment.entity';
import { ReservationSchema } from 'src/reservations/entities/reservation.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { MotorSchema } from 'src/motor/entities/motor.entity';
import { StorageSchema } from 'src/storage/entities/storage.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { MotorModule } from 'src/motor/motor.module';
import { UserModule } from 'src/user/user.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Payment',
        schema: PaymentSchema,
      },
      {
        name: 'Reservation',
        schema: ReservationSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Motor',
        schema: MotorSchema,
      },
      {
        name: 'Storage',
        schema: StorageSchema,
      },
    ]),
    forwardRef(() => ReservationsModule),
    forwardRef(() => MotorModule),
    forwardRef(() => StorageModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
