import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsService } from './todo-lists.service';
import { PrismaService } from '../infras/prisma/prisma.service';
import { Prisma, TodoList } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TodoListsController', () => {
  let controller: TodoListsController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoListsController],
      providers: [TodoListsService, PrismaService],
    }).compile();

    controller = module.get<TodoListsController>(TodoListsController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo list', async () => {
      const mockDto = {
        name: 'test-name',
      };
      const mockResponse = {
        id: 'test-id',
        name: 'test-name',
        todos: [],
      };
      jest
        .spyOn(prismaService.todoList, 'create')
        .mockResolvedValue({ ...mockResponse, isDeleted: false });

      const result = await controller.create(mockDto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findOne', () => {
    it('should get a todo list', async () => {
      const mockResponse = {
        id: 'test-id',
        name: 'test-name',
        todos: [],
      };
      jest
        .spyOn(prismaService.todoList, 'findUnique')
        .mockResolvedValue({ ...mockResponse, isDeleted: false });

      const result = await controller.findOne('test-id');
      expect(result).toEqual(mockResponse);
    });
    it('should throw not found when todo list not found', async () => {
      jest
        .spyOn(prismaService.todoList, 'findUnique')
        .mockResolvedValue(null);

      expect(() => controller.findOne('test-id')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a todo list', async () => {
      const mockDto = {
        id: 'test-id',
        name: 'test-name',
      };
      const mockResponse = {
        id: 'test-id',
        name: 'test-name',
        todos: [],
      };
      jest
        .spyOn(prismaService.todoList, 'update')
        .mockResolvedValue({ ...mockResponse, isDeleted: false });

      const result = await controller.update('test-id', mockDto);
      expect(result).toEqual(mockResponse);
    });

    it('should throw not found when the updating todo list not found', async () => {
      const mockDto = {
        id: 'test-id',
        name: 'test-name',
      };
      jest
        .spyOn(prismaService.todoList, 'findUnique')
        .mockRejectedValue(new Prisma.PrismaClientKnownRequestError('', { code : 'P2025', clientVersion: '3.0.0' }));

      expect(() => controller.update('test-id', mockDto)).rejects.toThrow(HttpException);
    });
  });

  describe('delete', () => {
    it('should delete a todo list', async () => {
      const mockResponse = {
        id: 'test-id',
        name: 'test-name',
        isDeleted: true,
      };
      jest
        .spyOn(prismaService.todoList, 'update')
        .mockResolvedValue(mockResponse);

      const result = await controller.remove('test-id');
      expect(result).toEqual(undefined);
    });
  });
});
