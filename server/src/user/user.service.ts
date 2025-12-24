import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from 'DTO/signup.dto';
import { LoginDTO } from 'DTO/login.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async login(data: LoginDTO) {
    try {
      const { email, password } = data;
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new BadRequestException("Don't have any account");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Wrong Password');
      }
      const token = this.jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      return { status: 200, user, token, msg: 'Login Complete' };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException('Sign up failed');
    }
  }
}
