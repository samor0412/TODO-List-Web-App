import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsService } from './todo-lists.service';
import { PrismaService } from '../infras/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { TodoList } from './entities/todo-list.entity';
import { Todo, TodoStatus } from '../todos/entities/todo.entity';

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
      const mockTodoListResponse = {
        id: 'test-id',
        name: 'test-name',
      };
      const mockTodoResponse = [
        {
          id: 'test-id',
          name: 'test-name',
          description: 'test-description',
          dueDate: dayjs('2020-07-10 15:00:00.000').toDate(),
          status: TodoStatus.NotStarted,
          listId: 'cly7me96z000211v5mds1idcm',
        },
      ];
      jest
        .spyOn(prismaService.todoList, 'findUnique')
        .mockResolvedValue({ ...mockTodoListResponse, isDeleted: false });
      jest
        .spyOn(prismaService.todo, 'findMany')
        .mockResolvedValue([{ ...mockTodoResponse[0], isDeleted: false }]);

      const result = await controller.findOne('test-id');

      const expectedTodoList = new TodoList();
      expectedTodoList.id = mockTodoListResponse.id;
      expectedTodoList.name = mockTodoListResponse.name;
      expectedTodoList.todos = mockTodoResponse.map((todo) => {
        const result = new Todo();
        result.id = todo.id;
        result.name = todo.name;
        result.description = todo.description;
        result.dueDate = todo.dueDate;
        result.status = todo.status;
        result.listId = todo.listId;
        return result;
      });
      expect(result).toEqual(expectedTodoList);
    });

    it('should throw not found when todo list not found', async () => {
      jest.spyOn(prismaService.todoList, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.todo, 'findMany').mockResolvedValue(null);

      expect(() => controller.findOne('test-id')).rejects.toThrow(
        HttpException,
      );
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
      jest.spyOn(prismaService.todoList, 'update').mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('', {
          code: 'P2025',
          clientVersion: '3.0.0',
        }),
      );

      expect(() => controller.update('test-id', mockDto)).rejects.toThrow(
        new HttpException('Not found', HttpStatus.NOT_FOUND),
      );
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
