import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getOrder(id: string) {
    try {
      const orders = await this.prisma.orders.findMany({
        where: {
          movieId: id,
          status: {
            in: ['PAID', 'PENDING'],
          },
        },
      });
      return { status: 200, orders };
    } catch (err) {
      throw new InternalServerErrorException('Get orders failed');
    }
  }
}
