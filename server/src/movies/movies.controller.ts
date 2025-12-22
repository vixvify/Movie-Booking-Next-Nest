import { Controller, UseInterceptors } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Post, Body, Get, Param } from '@nestjs/common/decorators';
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

  @Get('/getmovie_showing')
  getmovie_showing() {
    return this.movieservice.getmovie_showing();
  }

  @Get('/getmovie_coming')
  getmovie_coming() {
    return this.movieservice.getmovie_coming();
  }

  @Get('/getmovie_single/:id')
  getmovie_single(@Param('id') id: string) {
    return this.movieservice.getmovie_single(id);
  }
}
