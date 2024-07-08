import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from '../infras/prisma/prisma.service';
import * as dayjs from 'dayjs';
import { Prisma } from '@prisma/client';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { WebsocketsGateway } from '../websocket/websocket.gateway';
import { WEBSOCKET_EVENT } from '../websocket/websocket.constant';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(
    private prisma: PrismaService,
    private webSocketGateway: WebsocketsGateway,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    this.logger.log('create');
    try {
      const result = await this.prisma.todo.create({
        data: {
          ...createTodoDto,
          dueDate: dayjs(createTodoDto.dueDate).toDate(),
        },
      });
      this.logger.log(`create successfully, id: ${result.id}`);
      const { isDeleted: _, ...newTodo } = result;

      this.webSocketGateway.emitByTodoListSubscribers(newTodo.listId, {
        event: WEBSOCKET_EVENT.TODO_CREATED,
        data: newTodo,
      });
      return newTodo;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new HttpException(
            'Todo list does not exist',
            HttpStatus.CONFLICT,
          );
        }
      }
      this.logger.error(`create error: ${e}`);
      throw e;
    }
  }

  async update(id: string, updateDto: UpdateTodoDto) {
    this.logger.log(`update ${id}`);

    let result: any;
    try {
      result = await this.prisma.todo.update({
        where: { id },
        data: { ...updateDto, dueDate: new Date(updateDto.dueDate) },
      });
      this.logger.log(`update ${id} successfully`);
      const { isDeleted: _, ...newTodo } = result;

      this.webSocketGateway.emitByTodoListSubscribers(newTodo.listId, {
        event: WEBSOCKET_EVENT.TODO_UPDATED,
        data: newTodo,
      });
      return newTodo;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
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
      this.logger.error(`update error: ${e}`);
      throw e;
    }
  }

  async remove(id: string) {
    this.logger.log(`delete ${id}`);
    const result = await this.prisma.todo.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    const { isDeleted: _, ...deletedTodo } = result;
    this.webSocketGateway.emitByTodoListSubscribers(result.listId, {
      event: WEBSOCKET_EVENT.TODO_DELETED,
      data: deletedTodo,
    });

    this.logger.log(`delete ${id} successfully`);
  }
}
