import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from '../infras/prisma/prisma.service';
import { WebsocketsGateway } from '../websocket/websocket.gateway';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService, WebsocketsGateway],
})
export class TodosModule {}
