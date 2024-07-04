import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from '../infras/prisma/prisma.service';
import * as dayjs from 'dayjs';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) { }

  async create(createTodoDto: CreateTodoDto) {
    const result = await this.prisma.todo.create({
      data: { ...createTodoDto, dueDate: dayjs(createTodoDto.dueDate).toDate() },
    });
    return result
  }
}
