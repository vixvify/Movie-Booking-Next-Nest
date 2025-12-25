import { Injectable } from '@nestjs/common';
import Omise from 'omise';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingDTO } from 'DTO/booking.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private omise: Omise.IOmise;
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {
    const secretKey = this.config.get<string>('OMISE_SECRET_KEY');
    if (!secretKey) {
      throw new Error('OMISE_SECRET_KEY is missing');
    }
    this.omise = Omise({
      secretKey,
      publicKey: this.config.get<string>('OMISE_PUBLIC_KEY'),
    });
  }

  async createPromptPay(data: BookingDTO) {
    const charge = await this.omise.charges.create({
      amount: data.amount,
      currency: 'thb',
      source: {
        type: 'promptpay',
      } as any,
    });
    const source = charge.source as any;

    if (!source?.scannable_code?.image?.download_uri) {
      throw new Error('PromptPay QR not available');
    }
    await this.prisma.orders.create({
      data: {
        ...data,
        chargeId: charge.id,
        status: 'PENDING',
      },
    });
    const EXPIRE_MINUTES = 5;

    const expiresAt = new Date(
      Date.now() + EXPIRE_MINUTES * 60 * 1000,
    ).toISOString();

    return {
      chargeId: charge.id,
      qrImage: source.scannable_code.image.download_uri,
      expiresAt,
    };
  }
  async markPaid(chargeId: string) {
    await this.prisma.orders.update({
      where: { chargeId },
      data: { status: 'PAID' },
    });
  }
  async cancelOrder(chargeId: string) {
    await this.prisma.orders.update({
      where: { chargeId },
      data: { status: 'CANCELLED' },
    });
  }
}
