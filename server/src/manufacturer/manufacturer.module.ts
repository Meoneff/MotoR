import { Module, forwardRef } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { MotorModule } from 'src/motor/motor.module';
import { ManufacturerSchema } from './entities/manufacturer.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Manufacturer',
        schema: ManufacturerSchema,
      },
    ]),
    forwardRef(() => MotorModule),
  ],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}
