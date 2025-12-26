import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getSeatBooked(id: string) {
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
      throw new InternalServerErrorException('Get Seat Booked failed');
    }
  }

  async getStatus(id: string) {
    const order = await this.prisma.orders.findUnique({
      where: { id },
    });

    return { status: order?.status };
  }

  async getOrder(id: string) {
    try {
      const orders = await this.prisma.orders.findMany({
        where: { userId: id },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          movie: {
            select: {
              name: true,
            },
          },
        },
      });
      return { status: 200, orders };
    } catch (err) {
      throw new InternalServerErrorException('Get orders failed');
    }
  }
}
