import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { OrderCleanupService } from 'src/order-cleanup/order-cleanup.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [PaymentService, OrderCleanupService],
  controllers: [PaymentController],
})
export class PaymentModule {}
