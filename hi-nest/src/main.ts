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
    transform: true,
    // NestJS는 타입을 받아서 넘겨줄때 자동으로 타입을 변환해준다.
  }));

  await app.listen(3000);
}
bootstrap();
