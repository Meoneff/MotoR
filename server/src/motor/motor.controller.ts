import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MotorService } from './motor.service';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';

@Controller('motor')
export class MotorController {
  constructor(private readonly motorService: MotorService) {}

  @Post()
  create(@Body() createMotorDto: CreateMotorDto) {
    return this.motorService.create(createMotorDto);
  }

  @Get()
  findAll() {
    return this.motorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotorDto: UpdateMotorDto) {
    return this.motorService.update(+id, updateMotorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motorService.remove(+id);
  }
}
