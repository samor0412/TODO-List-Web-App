import { NestFactory } from '@nestjs/core';
import { TodoListsModule } from './todo-lists/todo-lists.module';

async function bootstrap() {
  const app = await NestFactory.create(TodoListsModule);
  await app.listen(3000);
}
bootstrap();
