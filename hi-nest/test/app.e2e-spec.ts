import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
  // ⭐ beforeEach = sequelize에서 force: true 상태와 같다.
  //     >> 데이터 베이스가 매실행마다 초기화된다.
  // ⭐ beforeAll = sequelize에서 force: false 상태와 같다.
  //     >> 데이터 베이스가 초기화되지 않고 진행된다.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", ()=>{
    it("GET", ()=>{
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);
    });
    it("POST", () =>{
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"TEST",
        year:2000,
        genres:["test"]
      })
      .expect(201)
    });
    it("DELETE", () =>{
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(404);
    });
  });

  describe("/movies/:id", ()=>{
    it("GET 200", ()=>{
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200);
    });
    it("GET 404", ()=>{
      return request(app.getHttpServer())
        .get("/movies/9999")
        .expect(404);
    });
    it.todo("DELETE");
    it.todo("PATCH");
  })
});
