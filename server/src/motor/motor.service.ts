import { HttpException, Injectable } from '@nestjs/common';
import { CreateMotorDto } from './dto/create-motor.dto';
import { UpdateMotorDto } from './dto/update-motor.dto';
import { Motor } from './entities/motor.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Storage } from 'src/storage/entities/storage.entity';
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
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try {
      const motors = await this.motorModel
        .find()
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
      return motors;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findByIsConfirmed(isConfirmed: boolean) {
    try {
      const motors = await this.motorModel
        .find({ isConfirmed: isConfirmed })
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
      return motors;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findByObjectId(objectId: string) {
    try {
      const motors = await this.motorModel
        .findById(objectId)
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
      return motors;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const motor = await this.motorModel
        .findOne({ motorId: id })
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
      return motor;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findById(motorId: string) {
    try {
      const motor = await this.motorModel
        .findById(motorId)
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
      return motor;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getByCategoryId(categoryId: string) {
    try {
      const motors = await this.motorModel
        .find({ categoryId: categoryId })
        .populate('image', 'urls', this.storageModel)
        .populate('manufacturerId', 'name', this.manufacturerModel)
        .populate('categoryId', 'name', this.categoryModel)
        .exec();
      return motors;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateMotorDto: UpdateMotorDto) {
    try {
      const updateMotor = await this.motorModel.findOneAndUpdate(
        { motorId: id },
        { ...updateMotorDto },
        { new: true },
      );
      return updateMotor;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(id: string, status: boolean) {
    try {
      const updateMotor = await this.motorModel.findOneAndUpdate(
        { motorId: id },
        { status: status },
        { new: true },
      );
      return updateMotor;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateIsConfirmed(id: string, isConfirmed: boolean) {
    try {
      const updateMotor = await this.motorModel.findOneAndUpdate(
        { motorId: id },
        { isConfirmed: isConfirmed },
        { new: true },
      );
      return updateMotor;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async remove(id: string) {
    try {
      const deletedMotor = await this.motorModel.findOneAndDelete({
        motorId: id,
      });
      return deletedMotor;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
