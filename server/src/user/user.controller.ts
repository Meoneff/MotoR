/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  @Get('all')
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async findOne(@Query('id') id: string) {
    try {
      const user = this.userService.findOne(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (err) {
      throw err;
    }
  }

  @Put('update')
  async update(@Query('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    try {
      const deletedUser = this.userService.remove(id);
      return deletedUser;
    } catch (err) {
      throw err;
    }
  }
  // eslint-disable-next-line prettier/prettier
  // eslint-disable-next-line prettier/prettier
  // eslint-disable-next-line prettier/prettier
}
