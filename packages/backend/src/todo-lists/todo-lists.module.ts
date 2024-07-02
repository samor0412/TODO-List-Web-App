import { Module } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { TodoListsController } from './todo-lists.controller';
import { PrismaService } from 'src/infras/prisma/prisma.service';

@Module({
  controllers: [TodoListsController],
  providers: [TodoListsService, PrismaService],
})
export class TodoListsModule {}
