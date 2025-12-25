import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MoviesModule } from './movies/movies.module';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PrismaModule, MoviesModule, OrdersModule, UserModule, AuthModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
