  // npm i class-validator
  // 설치 이유 : class의 유효성을 검사하기 위함

import { IsString, IsNumber, IsOptional } from "class-validator";
// @IsString, @IsNumber은 유효성 검사를 위한 것이다.
export class    CreateMovieDto{
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional()
    @IsString({each : true})
    // {each : true} >> 모든 요소를 하나씪 검사한다.
    // 왜냐하면 text의 string이기 때문이다.
    readonly genres: string[];
}