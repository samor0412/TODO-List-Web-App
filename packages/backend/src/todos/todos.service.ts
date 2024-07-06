import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from '../infras/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { Prisma } from '@prisma/client';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const result = await this.prisma.todo.create({
        data: {
          ...createTodoDto,
          dueDate: dayjs(createTodoDto.dueDate).toDate(),
        },
      });
      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new HttpException(
            'Todo list does not exist',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw e;
    }
  }

  async update(id: string, updateDto: UpdateTodoDto) {
    let result: any;
    try {
      result = await this.prisma.todo.update({
        where: { id },
        data: { ...updateDto, dueDate: new Date(updateDto.dueDate) },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
        switch (e.code) {
          case 'P2003':
            throw new HttpException(
              'Todo list does not exist',
              HttpStatus.CONFLICT,
            );
          case 'P2025':
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
      }
      throw e;
    }

    return result;
  }
}
