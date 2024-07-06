import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsString()
  @IsNotEmpty()
  listId: string;
}
