import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PrismaService } from '../infras/prisma/prisma.service';
import { TodoStatus } from './entities/todo.entity';
import * as dayjs from 'dayjs';

describe('TodosController', () => {
  let controller: TodosController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService, PrismaService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo list', async () => {
      const mockDto = {
        name: 'This is good',
        description: 'this is a des',
        dueDate: '2020-07-10 15:00:00.000',
        status: TodoStatus.Completed,
        listId: 'cly7me96z000211v5mds1idcm',
      };
      const mockResponse = {
        id: 'test-id',
        name: 'This is good',
        description: 'this is a des',
        dueDate: dayjs('2020-07-10 15:00:00.000').toDate(),
        status: TodoStatus.Completed,
        listId: 'cly7me96z000211v5mds1idcm',
      };
      jest
        .spyOn(prismaService.todo, 'create')
        .mockResolvedValue({ ...mockResponse, id: 'test-id' });

      const result = await controller.create(mockDto);
      expect(result).toEqual(mockResponse);
    });
  });
});
