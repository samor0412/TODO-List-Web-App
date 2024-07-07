import { Injectable, Logger } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { PrismaService } from '../infras/prisma/prisma.service';
import { transformTodoList } from './todo-lists.helper';
import { Prisma } from '@prisma/client';
import { QueryOptions } from 'src/constants/query';

@Injectable()
export class TodoListsService {
  private readonly logger = new Logger(TodoListsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createTodoListDto: CreateTodoListDto) {
    this.logger.log('create');

    const result = await this.prisma.todoList.create({
      data: createTodoListDto,
      include: { todos: true },
    });
    const data = transformTodoList(result);
    this.logger.log(`create successfully, id: ${data.id}`);
    return data
  }

  async findOne(id: string, options?: QueryOptions) {
    this.logger.log(`findOne with options: ${JSON.stringify(options)}`);

    const isSorting = options?.sortBy && options?.orderBy;
    const [todoList, todos] = await Promise.all([
      this.prisma.todoList.findUnique({
        where: { id, isDeleted: false },
      }),
      this.prisma.todo.findMany({
        where: { listId: id, isDeleted: false },
        ...(isSorting && {
          orderBy: { [options.sortBy]: options.orderBy },
        }),
      }),
    ]);
    const result = {
      ...todoList,
      todos,
    };
    return transformTodoList(result);
  }

  async update(id: string, { name }: UpdateTodoListDto) {
    this.logger.log(`update ${id}`);

    let result: any;
    try {
      result = await this.prisma.todoList.update({
        where: { id, isDeleted: false },
        data: {
          name,
        },
        include: { todos: true },
      });
      const data = transformTodoList(result);
      this.logger.log(`update ${id} successfully`);
      return data;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return null;
        }
      }
      throw e;
    }
  }

  async remove(id: string) {
    this.logger.log(`delete ${id}`);
    await this.prisma.todoList.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    this.logger.log(`delete ${id} successfully`);
  }
}
