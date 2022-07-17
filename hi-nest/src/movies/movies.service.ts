import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto2 } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:number): Movie {
        const movie =  this.movies.find(movie => movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    deleteOne(id:number) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    create(movieData: CreateMovieDto){
        // let Pid: number;  // <-- 직적 짠 코드 아래 코드의 문제 보완 but...  테스트 코드 짜는 방법을 아직 몰라서 패스
        // if(this.movies.length === 0){
        //     Pid = 1;
        // }else{
        //     Pid = this.movies[this.movies.length - 1].id + 1;
        // }
        // this.movies.push({
        //     id: Pid,
        //     ...movieData,
        // });
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }

    update(id:number, updateDate: UpdateMovieDto2){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateDate});
    }
}
