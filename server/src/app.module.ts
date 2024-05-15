/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MotorModule } from './motor/motor.module';
import { CategoryModule } from './category/category.module';
import { PaymentModule } from './payment/payment.module';
import { CommentModule } from './comment/comment.module';
import { RevenueModule } from './revenue/revenue.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ManufacturerService } from './manufacturer/manufacturer.service';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hahoangduy95:hahoangduy@cluster0.8n0bim9.mongodb.net/',
    ),
    AuthModule,
    UserModule,
    MotorModule,
    CategoryModule,
    PaymentModule,
    CommentModule,
    RevenueModule,
    ReservationsModule,
    ManufacturerModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
