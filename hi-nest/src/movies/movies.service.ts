import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:string): Movie {
        const movie =  this.movies.find(movie => movie.id === parseInt(id));
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    deleteOne(id:string) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== parseInt(id));
        return true;
    }

    create(movieData){
        let Pid: number;
        if(this.movies.length === 0){
            Pid = 1;
        }else{
            Pid = this.movies[this.movies.length - 1].id + 1;
        }
        this.movies.push({
            id: Pid,
            ...movieData,
        });
    }

    update(id:string, updateDate){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateDate});
    }
}
