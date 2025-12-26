import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderservice: OrdersService) {}
  @Get('/getSeatBooked/:id')
  getSeatBooked(@Param('id') id: string) {
    return this.orderservice.getSeatBooked(id);
  }

  @Get('/getstatus/:id')
  getStatus(@Param('id') id: string) {
    return this.orderservice.getStatus(id);
  }

  @Get('/getorders/:id')
  getOrders(@Param('id') id: string) {
    return this.orderservice.getOrder(id);
  }
}
