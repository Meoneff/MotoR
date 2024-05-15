import { Module, forwardRef } from '@nestjs/common';
import { MotorService } from './motor.service';
import { MotorController } from './motor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MotorSchema } from './entities/motor.entity';
import { ManufacturerSchema } from 'src/manufacturer/entities/manufacturer.entity';
import { CategorySchema } from 'src/category/entities/category.entity';
import { StorageSchema } from 'src/storage/entities/storage.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';
import { CategoryModule } from 'src/category/category.module';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Motor', schema: MotorSchema },
      { name: 'Manufacturer', schema: ManufacturerSchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Storage', schema: StorageSchema },
      { name: 'User', schema: UserSchema },
    ]),
    forwardRef(() => ManufacturerModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => ReservationsModule),
  ],
  controllers: [MotorController],
  providers: [MotorService],
  exports: [MotorService],
})
export class MotorModule {}
