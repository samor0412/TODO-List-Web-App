import { NestFactory } from '@nestjs/core';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';


@Module({
  imports: [TodoListsModule, TodosModule],
})
export class AppModule {}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
