import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { SignupDTO } from 'DTO/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Post('/signup')
  signup(@Body() data: SignupDTO) {
    return this.userservice.signup(data);
  }
}
