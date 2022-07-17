import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers:[MoviesController],
    providers:[MoviesService],
    // NestJS가 알아서 providers를 import 해준다.
})
export class MoviesModule {}
