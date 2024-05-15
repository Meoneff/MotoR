import { HttpException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Motor } from 'src/motor/entities/motor.entity';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Storage } from 'src/storage/entities/storage.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Motor.name) private readonly motorModel: Model<Motor>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    try {
      const createReservation = new this.reservationModel(createReservationDto);
      return await createReservation.save();
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try {
      const reservations = await this.reservationModel
        .find()
        .populate('motorId', 'name motorID', this.motorModel)
        .populate('customerId', 'name', this.userModel)
        .populate('image', 'urls', this.storageModel)
        .exec();
      return reservations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findReservationsByCustomerId(customerId: string) {
    try {
      const reservations = await this.reservationModel
        .find({ customerId: customerId })
        .populate('motorId', 'name motorID image', this.motorModel)
        .populate('customerId', 'name', this.userModel)
        .populate('image', 'urls', this.storageModel)
        .exec();
      return reservations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findReservationsByObjId(id: string) {
    try {
      const reservations = await this.reservationModel
        .findById(id)
        .populate('motorId', 'name motorId', this.motorModel)
        .populate('customerId', 'name', this.userModel)
        .populate('image', 'urls', this.storageModel)
        .exec();
      return reservations;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try {
      const reservation = await this.reservationModel
        .findOne({ reservationId: id })
        .populate('motorId', 'name motorId', this.motorModel)
        .populate('customerId', 'name', this.userModel)
        .populate('image', 'urls', this.storageModel)
        .exec();
      return reservation;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findByStartDate(startDate: string, status: boolean) {
    try {
      const reservation = await this.reservationModel
        .find({ startDate: startDate, status: status })
        .populate('motorId', 'name motorId', this.motorModel)
        .populate('customerId', 'name', this.userModel)
        .populate('image', 'urls', this.storageModel)
        .exec();
      return reservation;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async findByEndDate(endDate: string, status: boolean) {
    try {
      const reservation = await this.reservationModel
        .find({ endDate: endDate, status: status })
        .populate('motorId', 'name motorId', this.motorModel)
        .populate('customerId', 'name', this.userModel)
        .populate('image', 'urls', this.storageModel)
        .exec();
      return reservation;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
  async update(id: string, updateReservationDto: UpdateReservationDto) {
    try {
      const updatedReservation = await this.reservationModel.findOneAndUpdate(
        { reservationId: id },
        { ...updateReservationDto },
        { new: true },
      );
      return updatedReservation;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateStatus(id: string) {
    try {
      const updatedReservation = await this.reservationModel.findByIdAndUpdate(
        id,
        { status: true },
        { name: true },
      );
      return updatedReservation;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    try {
      const deletedReservation = await this.reservationModel.findOneAndDelete({
        reservationId: id,
      });
      return deletedReservation;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
