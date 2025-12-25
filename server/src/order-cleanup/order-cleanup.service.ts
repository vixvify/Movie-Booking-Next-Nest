import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderCleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron('*/1 * * * *')
  async cancelExpiredOrders() {
    const now = new Date();

    const expiredOrders = await this.prisma.orders.findMany({
      where: {
        status: 'PENDING',
        expiresAt: {
          lt: now,
        },
      },
    });

    if (expiredOrders.length === 0) return;

    await this.prisma.orders.updateMany({
      where: {
        id: { in: expiredOrders.map((e) => e.id) },
        status: 'PENDING',
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }
}
