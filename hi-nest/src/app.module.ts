import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';


@Module({
  imports: [MoviesModule],
  controllers: [AppController], // 라우터와 비슷하다.
  providers: [],
})
export class AppModule {}
