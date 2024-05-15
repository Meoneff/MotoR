import { Module, forwardRef } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MotorSchema } from 'src/motor/entities/motor.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './entities/reservation.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { StorageSchema } from 'src/storage/entities/storage.entity';
import { MotorModule } from 'src/motor/motor.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Reservation',
        schema: ReservationSchema,
      },
      {
        name: 'Motor',
        schema: MotorSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Storage',
        schema: StorageSchema,
      },
    ]),
    forwardRef(() => MotorModule),
    forwardRef(() => StorageModule),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
