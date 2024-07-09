import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Model } from 'mongoose';
import { Payment } from './entities/payment.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { User } from 'src/user/entities/user.entity';
import { Motor } from 'src/motor/entities/motor.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Motor.name) private readonly motorModel: Model<Motor>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const createPayment = new this.paymentModel(createPaymentDto);
      return await createPayment.save();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findAll() {
    try {
      const payments = await this.paymentModel
        .find()
        .populate('reservationId', 'reservationId', this.reservationModel)
        .populate('customerId', 'name', this.userModel)
        .exec();
      return payments;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findPaymentsByCustomerId(customerId: string) {
    try {
      const payments = await this.paymentModel
        .find({ customerId: customerId })
        .populate('reservationId', 'reservationId', this.reservationModel)
        .populate('customerId', 'name', this.userModel)
        .exec();
      return payments;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findPaymentsByReservationId(reservationId: string) {
    try {
      const payments = await this.paymentModel
        .find({ reservationId: reservationId })
        .populate('reservationId', 'reservationId', this.reservationModel)
        .populate('customerId', 'name', this.userModel)
        .exec();
      return payments;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const payment = await this.paymentModel
        .findOne({ paymentId: id })
        .populate('reservationId', 'reservationId', this.reservationModel)
        .populate('customerId', 'name', this.userModel)
        .exec();
      if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return payment;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const updatedPayment = await this.paymentModel.findOneAndUpdate(
        { paymentId: id },
        { ...updatePaymentDto },
        { new: true },
      );
      if (!updatedPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return updatedPayment;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(id: string, status: boolean) {
    try {
      const updatedPayment = await this.paymentModel.findByIdAndUpdate(
        id,
        { status: status },
        { new: true },
      );
      if (!updatedPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return updatedPayment;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updatePaymentMethod(id: string, paymentMethod: string, amount: number) {
    try {
      const updatedPayment = await this.paymentModel.findByIdAndUpdate(
        id,
        { paymentMethod: paymentMethod, amount: amount },
        { new: true },
      );
      if (!updatedPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return updatedPayment;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedPayment = await this.paymentModel.findOneAndDelete({
        paymentId: id,
      });
      if (!deletedPayment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
      }
      return deletedPayment;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
