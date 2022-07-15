import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';


@Module({
  imports: [],
  controllers: [MoviesController], // 라우터와 비슷하다.
  providers: [MoviesService],
})
export class AppModule {}
