import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from 'DTO/signup.dto';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async signup(data: SignupDTO) {
    try {
      const isAdmin = data.name === 'admin';
      const { password } = data;
      const hashPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: {
          ...data,
          password: hashPassword,
          isAdmin,
        },
      });
      return { status: 201, msg: 'Signup Complete' };
    } catch (err) {
      throw new InternalServerErrorException('Sign up failed');
    }
  }
}
