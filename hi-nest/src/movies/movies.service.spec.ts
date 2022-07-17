import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", ()=>{
    expect(2+2).toEqual(4);
  });

  describe("getAll", ()=>{
    it ("should return an array", ()=>{
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie.", () => {
      service.create({
        title : "Test Movie",
        year : 2000,
        genres :["test"],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it("should throw 404 error", ()=>{
      try{
        service.getOne(9999);
      }catch(err){
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("deleteOne", ()=>{
    it("deletes a movie", ()=>{
      service.create({
        title : "Test Movie",
        year : 2000,
        genres : ["test"],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it("should return a 404", ()=>{
      try{
        service.deleteOne(9999);
      }catch(err){
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", ()=>{
    it("should create  a movie", ()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movies",
        year : 2000,
        genres : ["test"],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", ()=>{
    it("should update a movie", ()=>{
      service.create({
        title: "Test Movies",
        year : 2000,
        genres : ["test"],
      });
      service.update(1,{title:"Updated Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
    });

    it("should throw a NotFoundExc", ()=>{
      try{
        service.update(999,{});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });
});
