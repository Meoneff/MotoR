import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async reate(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryService.create(createCategoryDto);
      return newCategory;
    } catch (err) {
      throw err;
    }
  }

  @Get('get/all')
  async findAll() {
    try {
      const categories = await this.categoryService.findAll();
      return categories;
    } catch (err) {
      throw err;
    }
  }

  @Get('get/id')
  async findOne(@Query('categoryId') categoryId: string) {
    try {
      const category = await this.categoryService.findOne(categoryId);
      return category;
    } catch (err) {
      throw err;
    }
  }

  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const newCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
      );
      return newCategory;
    } catch (err) {
      throw err;
    }
  }

  @Put('increase')
  async increase(@Query('id') id: string) {
    try {
      const newCategory = await this.categoryService.increase(id);
      return newCategory;
    } catch (err) {
      throw err;
    }
  }
  @Put('decrease')
  async decrease(@Query('id') id: string) {
    try {
      const newCategory = await this.categoryService.decrease(id);
      return newCategory;
    } catch (err) {
      throw err;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try {
      const deletedCategory = await this.categoryService.remove(id);
      return deletedCategory;
    } catch (err) {
      throw err;
    }
  }
}
