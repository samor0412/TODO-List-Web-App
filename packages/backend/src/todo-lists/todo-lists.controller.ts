import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';
import { QueryOptions } from '../constants/query';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo Lists')
@Controller('todo-lists')
export class TodoListsController {
  constructor(private readonly todoListsService: TodoListsService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: TodoList })
  @ApiOperation({ summary: 'Create a new todo list' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
    example: {
      message: ['name should not be empty'],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  async create(
    @Body() createTodoListDto: CreateTodoListDto,
  ): Promise<TodoList> {
    return this.todoListsService.create(createTodoListDto);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TodoList })
  @ApiOperation({ summary: 'Get a todo list by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
    example: {
      message: ['name should not be empty'],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  async findOne(@Param('id') id: string, @Query() options?: QueryOptions) {
    const result = await this.todoListsService.findOne(id, options);
    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch a todo list by id and its todos' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TodoList })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request.',
    example: {
      message: ['name should not be empty'],
      error: 'Bad Request',
      statusCode: HttpStatus.BAD_REQUEST,
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    const result = await this.todoListsService.update(id, updateTodoListDto);

    if (!result) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo list by id' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.todoListsService.remove(id);
  }
}
