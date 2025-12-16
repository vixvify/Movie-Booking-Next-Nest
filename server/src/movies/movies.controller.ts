import { Controller, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Post, Body } from '@nestjs/common/decorators';
import { AddMovieDTO } from 'DTO/addmovie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';

@Controller('movies')
export class MoviesController {
  constructor(private movieservice: MoviesService) {}

  @Post('/addmovie')
  @UseInterceptors(FileInterceptor('poster'))
  addmovie(
    @UploadedFile() poster: Express.Multer.File,
    @Body() data: AddMovieDTO,
  ) {
    return this.movieservice.addmovie(data, poster);
  }
}
