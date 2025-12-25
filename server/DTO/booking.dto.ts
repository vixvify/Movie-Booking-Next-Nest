import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class BookingDTO {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  seats: string;

  @IsString()
  @IsNotEmpty()
  showtime: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  movieId: string;
}
