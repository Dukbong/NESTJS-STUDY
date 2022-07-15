import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
@Controller('movies') //<-- 중요하다.
// localhost:3000/movies 이 주소를 가지고 있다.
export class MoviesController {
    constructor(private readonly moviesService: MoviesService){}
    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get("/:id")
    getOne(@Param("id") 변수명: string): Movie{
        // @Param("id") >> Get주소에있는 id를 변수명에 저장하고
        // 변수를 string타입으로 지정해줬다.
        return  this.moviesService.getOne(변수명);
    }

    @Post()
    creates(@Body() 변수명){ // JSON 형식
        return this.moviesService.create(변수명);
    }

    @Delete("/:id")
    remove(@Param("id") 변수명: string){
        return this.moviesService.deleteOne(변수명);
    }

    @Patch("/:id") // @Put >> Update (전체) , @Patch >> Update (일부분)
    path(@Param("id") 변수명:string, @Body() 변수명2){
        return this.moviesService.update(변수명, 변수명2);
    } 
}
