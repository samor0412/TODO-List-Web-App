import { NestFactory } from '@nestjs/core';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(TodoListsModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
