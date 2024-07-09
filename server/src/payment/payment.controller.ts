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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const newPayment = await this.paymentService.create(createPaymentDto);
      return newPayment;
    } catch (err) {
      throw err;
    }
  }

  @Get('all')
  async findAll() {
    try {
      const payments = await this.paymentService.findAll();
      return payments;
    } catch (err) {
      throw err;
    }
  }

  @Get('byCustomerId')
  async findPaymentsByCustomerId(@Query('customerId') customerId: string) {
    try {
      const payments =
        await this.paymentService.findPaymentsByCustomerId(customerId);
      return payments;
    } catch (err) {
      throw err;
    }
  }

  @Get('byReservationId')
  async findPaymentsByReservationId(
    @Query('reservationId') reservationId: string,
  ) {
    try {
      const payments =
        await this.paymentService.findPaymentsByReservationId(reservationId);
      return payments;
    } catch (err) {
      throw err;
    }
  }

  @Get('byPaymentId')
  async findOne(@Query('id') id: string) {
    try {
      const payment = await this.paymentService.findOne(id);
      return payment;
    } catch (err) {
      throw err;
    }
  }

  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      const updatedPayment = await this.paymentService.update(
        id,
        updatePaymentDto,
      );
      return updatedPayment;
    } catch (err) {
      throw err;
    }
  }

  @Put('updateStatus')
  async updateStatus(@Query('id') id: string, @Body() status: boolean) {
    try {
      const updatedPayment = await this.paymentService.updateStatus(id, status);
      return updatedPayment;
    } catch (err) {
      throw err;
    }
  }

  @Put('updatePaymentMethod')
  async updatePaymentMethod(
    @Query('id') id: string,
    @Body() updatePaymentMethodDto: { paymentMethod: string; amount: number },
  ) {
    try {
      const updatedPayment = await this.paymentService.updatePaymentMethod(
        id,
        updatePaymentMethodDto.paymentMethod,
        updatePaymentMethodDto.amount,
      );
      return updatedPayment;
    } catch (err) {
      throw err;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try {
      const deletedPayment = await this.paymentService.remove(id);
      return deletedPayment;
    } catch (err) {
      throw err;
    }
  }
}
