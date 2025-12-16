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
          ...data,
          imgUrl: image.secure_url,
        },
      });
      return { status: 201, msg: 'Add Movie Complete' };
    } catch (err) {
      throw err;
    }
  }

  async getmovie_showing() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const movies = await this.prisma.movies.findMany({
        where: {
          release: {
            lt: today,
          },
        },
      });
      return { status: 200, movies };
    } catch (err) {
      throw err;
    }
  }

  async getmovie_coming() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const movies = await this.prisma.movies.findMany({
        where: {
          release: {
            gte: today,
          },
        },
      });
      return { status: 200, movies };
    } catch (err) {
      throw err;
    }
  }
}
