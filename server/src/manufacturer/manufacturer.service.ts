import { HttpException, Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Manufacturer } from './entities/manufacturer.entity';
import { Model } from 'mongoose';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel(Manufacturer.name)
    private readonly manufacturerModel: Model<Manufacturer>,
  ) {}
  async create(createManufacturerDto: CreateManufacturerDto) {
    try {
      const createdManufacturer = new this.manufacturerModel(
        createManufacturerDto,
      );
      return await createdManufacturer.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try {
      const manufacturers = await this.manufacturerModel.find().exec();
      return manufacturers;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const manufacturer = await this.manufacturerModel
        .findOne({ manufacturerId: id })
        .exec();
      return manufacturer;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    try {
      const updatedManufacturer = await this.manufacturerModel.findOneAndUpdate(
        { manufacturerId: id },
        { ...updateManufacturerDto },
        { new: true },
      );
      return updatedManufacturer;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async increase(id: string) {
    try {
      const manufacturer = await this.manufacturerModel.findByIdAndUpdate(
        id,
        { $inc: { quantity: 1 } },
        { new: true },
      );
      return manufacturer;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async decrease(id: string) {
    try {
      const updatemanufacturer = await this.manufacturerModel
        .findById(id)
        .exec();
      if (updatemanufacturer.quantity <= 0) {
        throw new HttpException('Quantity cannot be less than 0', 400);
      } else {
        const manufacturer = await this.manufacturerModel.findByIdAndUpdate(
          id,
          { $inc: { quantity: -1 } },
          { new: true },
        );
        return manufacturer;
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedManufacturer = await this.manufacturerModel.findOneAndDelete(
        { manufacturerId: id },
      );
      return deletedManufacturer;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
