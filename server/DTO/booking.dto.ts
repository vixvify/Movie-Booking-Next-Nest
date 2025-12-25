import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';

export class BookingDTO {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsArray()
  @IsInt({ each: true })
  @ArrayNotEmpty()
  seats: number[];

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
