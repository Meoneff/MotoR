import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find().exec();
      return categories;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryModel
        .findOne({ categoryId: id })
        .exec();
      return category;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async increase(id: string) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        id,
        { $inc: { quantity: 1 } },
        { new: true },
      );
      return category;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async decrease(id: string) {
    try {
      const updateCategory = await this.categoryModel.findById(id).exec();
      if (updateCategory.quantity <= 0) {
        throw new HttpException('Quantity cannot be less than 0', 400);
      } else {
        const category = await this.categoryModel.findByIdAndUpdate(
          id,
          { $inc: { quantity: -1 } },
          { new: true },
        );
        return category;
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.categoryModel.findOneAndUpdate(
        { categoryId: id },
        { ...updateCategoryDto },
        { new: true },
      );
      return updatedCategory;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedCard = await this.categoryModel.findOneAndDelete({
        categoryId: id,
      });
      return deletedCard;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
