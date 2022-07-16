import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// export class UpdateMovieDto{
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;

//     @IsString({each: true})
//     readonly genres?: string[];
// }   

// dto륾 만드는 다른 방법

// npm i @nestjs/mapped-types
export class UpdateMovieDto2 extends PartialType(CreateMovieDto){}
// 코드 해석 : UpdateMovieDto2라는 클래스는 CreateMovieDto를 상속 받아오는데
// 전부 필수 사항은 아니다.
