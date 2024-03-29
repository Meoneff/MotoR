import { Test, TestingModule } from '@nestjs/testing';
import { MotorService } from './motor.service';

describe('MotorService', () => {
  let service: MotorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorService],
    }).compile();

    service = module.get<MotorService>(MotorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
