import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { Motor } from './entities/motor.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MotorService {
  constructor(
    @InjectModel(Motor.name) private readonly motorModel: Model<Motor>,
    @InjectModel(Manufacturer.name)
    private readonly manufacturerModel: Model<Manufacturer>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createMotorDto: CreateMotorDto): Promise<Motor> {
    try {
      const createMotor = new this.motorModel(createMotorDto);
      return await createMotor.save();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Motor[]> {
    try {
      return await this.motorModel
        .find()
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByIsConfirmed(isConfirmed: boolean): Promise<Motor[]> {
    try {
      return await this.motorModel
        .find({ isConfirmed })
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findByObjectId(objectId: string): Promise<Motor> {
    try {
      return await this.motorModel
        .findById(objectId)
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Motor> {
    try {
      return await this.motorModel
        .findOne({ motorId: id })
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getByCategoryId(categoryId: string): Promise<Motor[]> {
    try {
      return await this.motorModel
        .find({ categoryId })
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateMotorDto: UpdateMotorDto): Promise<Motor> {
    try {
      const updateMotor = await this.motorModel.findOneAndUpdate(
        { motorId: id },
        { ...updateMotorDto },
        { new: true },
      );
      if (!updateMotor) {
        throw new HttpException('Motor not found', HttpStatus.NOT_FOUND);
      }
      return updateMotor;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatus(id: string, status: boolean): Promise<Motor> {
    try {
      const updateMotor = await this.motorModel.findOneAndUpdate(
        { motorId: id },
        { status },
        { new: true },
      );
      if (!updateMotor) {
        throw new HttpException('Motor not found', HttpStatus.NOT_FOUND);
      }
      return updateMotor;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateIsConfirmed(id: string, isConfirmed: boolean): Promise<Motor> {
    try {
      const updateMotor = await this.motorModel.findOneAndUpdate(
        { motorId: id },
        { isConfirmed },
        { new: true },
      );
      if (!updateMotor) {
        throw new HttpException('Motor not found', HttpStatus.NOT_FOUND);
      }
      return updateMotor;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<Motor> {
    try {
      const deletedMotor = await this.motorModel.findOneAndDelete({
        motorId: id,
      });
      if (!deletedMotor) {
        throw new HttpException('Motor not found', HttpStatus.NOT_FOUND);
      }
      return deletedMotor;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
