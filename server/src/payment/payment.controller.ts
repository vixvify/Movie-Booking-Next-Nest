import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { BookingDTO } from 'DTO/booking.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('promptpay')
  async createQR(@Body() body: BookingDTO) {
    return this.paymentService.createPromptPay(body);
  }
  @Post('webhook')
  async webhook(@Req() req: any) {
    const event = req.body;

    if (event.type == 'charge.successful') {
      const charge = event.data;
      await this.paymentService.markPaid(charge.id);
    }

    if (event.type == 'charge.failed' || event.type == 'charge.expired') {
      const charge = event.data;
      await this.paymentService.cancelOrder(charge.id);
    }
    return { received: true };
  }
}
