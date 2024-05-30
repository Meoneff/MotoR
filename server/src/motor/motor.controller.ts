import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { MotorService } from './motor.service';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { CategoryService } from 'src/category/category.service';
import { ReservationsService } from 'src/reservations/reservations.service';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import { UpdateStatusDto } from './dto/update-status-motor.dto';

@Controller('motor')
export class MotorController {
  constructor(
    private readonly motorService: MotorService,
    private manufacturerService: ManufacturerService,
    private categoryService: CategoryService,
    private reservationsService: ReservationsService,
  ) {}

  @Post('create')
  async create(@Body() createMotorDto: CreateMotorDto) {
    try {
      const newMotor = await this.motorService.create(createMotorDto);
      return newMotor;
    } catch (err) {
      // return this.motorService.create(createMotorDto);
      console.log(err);
      return err;
    }
  }

  @Get('get')
  async findAll() {
    try {
      const motors = await this.motorService.findAll();
      return motors;
    } catch (err) {
      console.log(err);
      return err;
    }
    // return this.motorService.findAll();
  }

  @Get()
  async findByIsConfirmed(@Query('isConfirmed') isConfirmed: boolean) {
    try {
      const motors = await this.motorService.findByIsConfirmed(isConfirmed);
      return motors;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('byMotorId')
  async findOne(@Query('motorId') motorId: string) {
    try {
      const motor = await this.motorService.findOne(motorId);
      return motor;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('byObjectId')
  async findByObjectId(@Query('id') id: string) {
    try {
      const motor = await this.motorService.findByObjectId(id);
      return motor;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  //Category

  @Get('motorCategoryId')
  async findByCategoryId(@Query('categoryId') categoryId: string) {
    try {
      const motors = await this.motorService.getByCategoryId(categoryId);
      return motors;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() updateMotorDto: UpdateMotorDto,
  ) {
    try {
      const updatedMotor = await this.motorService.update(id, updateMotorDto);
      return updatedMotor;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Put('status')
  async updateStatus(@Query('id') id: string, @Body() status: any) {
    try {
      const updatedMotor = await this.motorService.updateStatus(
        id,
        status.status,
      );
      return updatedMotor;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put('allstatus')
  async updateAllStatus(
    @Query('status') status: boolean,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    try {
      const { ids } = updateStatusDto;
      const updatedMotors = await Promise.all(
        ids.map(async (id) => {
          const updatedMotor = await this.motorService.updateStatus(id, status);
          return updatedMotor;
        }),
      );
      return updatedMotors;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Put('isConfirmed')
  async updateIsConfirmed(@Query('id') id: string, @Body() isConfirmed: any) {
    try {
      const updatedMotor = await this.motorService.updateIsConfirmed(
        id,
        isConfirmed.status,
      );
      await this.categoryService.increase(updatedMotor.categoryId);
      await this.manufacturerService.increase(updatedMotor.manufacturerId);
      return updatedMotor;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try {
      const deletedMotor = await this.motorService.remove(id);
      await this.categoryService.decrease(deletedMotor.categoryId);
      await this.manufacturerService.decrease(deletedMotor.manufacturerId);
      return deletedMotor;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Delete('deleteConfirmed')
  async removeConfirmed(@Query('id') id: string) {
    try {
      const deletedMotor = await this.motorService.remove(id);
      await this.categoryService.decrease(deletedMotor.categoryId);
      return deletedMotor;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
