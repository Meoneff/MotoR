import { Test, TestingModule } from '@nestjs/testing';
import { MotorController } from './motor.controller';
import { MotorService } from './motor.service';

describe('MotorController', () => {
  let controller: MotorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotorController],
      providers: [MotorService],
    }).compile();

    controller = module.get<MotorController>(MotorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
