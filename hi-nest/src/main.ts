import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// npm i class-transformer
// 설치이유 : NestJS는 타입을 받아서 넘겨줄때 자동으로 타입을 변환해준다.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // express의 미들웨어 같은 존재
  app.useGlobalPipes( new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // dto에 정의되지 않은 프로퍼티를 넘길시 에러뜨게 만든다.
    transform: true,
    // NestJS는 타입을 받아서 넘겨줄때 자동으로 타입을 변환해준다.
    // ⭐ transform: true라면 테스트 코드 작성시 주의해야한다.
    //     >> 지금 작성된 API의 경우 movies.controller에 있는 getOne() 함수를 보면
    //     >> 16번째 줄을 보면 원래 @Param("id")는 string 타입이지만
    //     >> 강제로 number 타입으로 변경한것을 볼 수 있다.
    //     >> ⭐ 테스트 코드에도 main에 있는 설정들을 똑같이 해주어야 한다.
    //         >> 위 설정과 똑같이 app.e2e-spec.ts 파일 19번째 줄에 작성해주었다. 
  }));

  await app.listen(3000);
}
bootstrap();
