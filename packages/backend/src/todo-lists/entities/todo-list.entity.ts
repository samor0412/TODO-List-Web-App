import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../../todos/entities/todo.entity';
import { IsArray, IsString } from 'class-validator';

export class TodoList {
  @ApiProperty({ example: 'clyd36zpo0001hdmnvxwjmcxp' })
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [Todo] })
  @IsArray()
  todos: Todo[];
}
