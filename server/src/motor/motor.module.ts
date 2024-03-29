import { Module } from '@nestjs/common';
import { MotorService } from './motor.service';
import { MotorController } from './motor.controller';

@Module({
  controllers: [MotorController],
  providers: [MotorService],
})
export class MotorModule {}
