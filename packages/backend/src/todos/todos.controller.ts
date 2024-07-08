import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('Todo')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Todo })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Todo list does not exist',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    example: {
      message: ['dueDate must be a valid ISO 8601 date string'],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiResponse({ status: HttpStatus.OK, type: Todo })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Todo list does not exist',
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
    example: {
      message: ['dueDate must be a valid ISO 8601 date string'],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
