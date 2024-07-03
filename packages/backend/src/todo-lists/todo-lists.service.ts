import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { PrismaService } from '../infras/prisma/prisma.service';
import { transformTodoList } from './todo-lists.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoListsService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoListDto: CreateTodoListDto) {
    const result = await this.prisma.todoList.create({
      data: createTodoListDto,
      include: { todos: true },
    });
    return transformTodoList(result);
  }

  async findOne(id: string) {
    const result = await this.prisma.todoList.findUnique({
      where: { id, isDeleted: false },
      include: { todos: true },
    });

    return transformTodoList(result);
  }

  async update(id: string, { name }: UpdateTodoListDto) {
    let result : any;
    try {
      result = await this.prisma.todoList.update({
        where: { id, isDeleted: false },
        data: {
          name,
        },
        include: { todos: true },
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          return null;
        }
      }
      throw e;
    }

    return transformTodoList(result);
  }

  async remove(id: string) {
    await this.prisma.todoList.update({
      where: { id },
      data: {
        isDeleted: true,
      }
    });
  }
}
