import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddMovieDTO } from 'DTO/addmovie.dto';
import cloudinary from '../cloudinary/cloudinary.provider';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async addmovie(data: AddMovieDTO, file: Express.Multer.File) {
    const image: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'movies' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
    try {
      await this.prisma.movies.create({
        data: {
          name: data.name,
          description: data.description,
          duration: data.duration,
          release: data.release,
          imgUrl: image.secure_url,
        },
      });
      return { status: 201, msg: 'Add Movie Complete' };
    } catch (err) {
      throw err;
    }
  }
}
