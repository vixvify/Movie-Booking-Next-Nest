import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AddMovieDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsDateString()
  @IsNotEmpty()
  release: string;
}
