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
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post('create')
  async create(@Body() createManufacturerDto: CreateManufacturerDto) {
    try {
      const newManufacturer = await this.manufacturerService.create(
        createManufacturerDto,
      );
      return newManufacturer;
    } catch (err) {
      throw err;
    }
  }

  @Get('get/all')
  async findAll() {
    try {
      const manufacturers = await this.manufacturerService.findAll();
      return manufacturers;
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async findOne(@Query('id') id: string) {
    try {
      console.log(id);
      const manufacturer = await this.manufacturerService.findOne(id);
      return manufacturer;
    } catch (err) {
      throw err;
    }
  }

  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    try {
      const updatedManufacturer = await this.manufacturerService.update(
        id,
        updateManufacturerDto,
      );
      return updatedManufacturer;
    } catch (err) {
      throw err;
    }
  }

  @Put('increase')
  async increaseQuantity(@Query('id') id: string) {
    try {
      const increaseQuantityManufacturer =
        await this.manufacturerService.increase(id);
      return increaseQuantityManufacturer;
    } catch (err) {
      throw err;
    }
  }
  @Put('decrease')
  async decreaseQuantity(@Query('id') id: string) {
    try {
      const decreaseQuantityManufacturer =
        await this.manufacturerService.decrease(id);
      return decreaseQuantityManufacturer;
    } catch (err) {
      throw err;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try {
      const deletedManufacturer = await this.manufacturerService.remove(id);
      return deletedManufacturer;
    } catch (err) {
      throw err;
    }
  }
}
