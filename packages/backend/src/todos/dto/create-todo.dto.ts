import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Date })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    enum: TodoStatus,
  })
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @ApiProperty({ example: 'clyacqf260000mydnmdyp3jt0' })
  @IsString()
  @IsNotEmpty()
  listId: string;
}
