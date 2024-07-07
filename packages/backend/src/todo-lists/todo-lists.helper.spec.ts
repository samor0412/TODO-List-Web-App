import {
  Todo as PrismaTodo,
  TodoList as PrismaTodoList,
  TodoStatus as PrismaTodoStatus,
} from '@prisma/client';
import { TodoStatus } from '../todos/entities/todo.entity';
import {
  prepareGetTodoListPrismaOptions,
  transformTodoList,
} from './todo-lists.helper';
import { TodoList } from './entities/todo-list.entity';

describe('transformTodoList', () => {
  it('should transform a prisma todo list to a todo list', () => {
    const mockPrismaTodoList: PrismaTodoList & { todos: PrismaTodo[] } = {
      id: 'test-list-id',
      name: 'test-name',
      todos: [
        {
          id: 'test-todo-id',
          name: 'test-todo',
          description: 'test-description',
          dueDate: new Date(),
          status: TodoStatus.Completed,
          listId: 'test-list-id',
          isDeleted: false,
        },
      ],
      isDeleted: false,
    };
    const mockTodoList: TodoList = {
      id: 'test-list-id',
      name: 'test-name',
      todos: [
        {
          id: 'test-todo-id',
          name: 'test-todo',
          description: 'test-description',
          dueDate: new Date(),
          status: TodoStatus.Completed,
          listId: 'test-list-id',
        },
      ],
    };
    const result = transformTodoList(mockPrismaTodoList);
    expect(result).toEqual(mockTodoList);
  });
  it('should filter deleted todos', () => {
    const mockPrismaTodoList: PrismaTodoList & { todos: PrismaTodo[] } = {
      id: 'test-list-id',
      name: 'test-name',
      todos: [
        {
          id: 'deleted-test-todo-id',
          name: 'test-todo',
          description: 'test-description',
          dueDate: new Date(),
          status: TodoStatus.Completed,
          listId: 'test-list-id',
          isDeleted: true,
        },
        {
          id: 'test-todo-id',
          name: 'test-todo',
          description: 'test-description',
          dueDate: new Date(),
          status: TodoStatus.Completed,
          listId: 'test-list-id',
          isDeleted: false,
        },
      ],
      isDeleted: false,
    };
    const mockTodoList: TodoList = {
      id: 'test-list-id',
      name: 'test-name',
      todos: [
        {
          id: 'test-todo-id',
          name: 'test-todo',
          description: 'test-description',
          dueDate: new Date(),
          status: TodoStatus.Completed,
          listId: 'test-list-id',
        },
      ],
    };
    const result = transformTodoList(mockPrismaTodoList);
    expect(result).toEqual(mockTodoList);
  });
});

describe('prepareGetTodoListPrismaOptions', () => {
  it('should prepare prisma options', () => {
    const prismaOptions = prepareGetTodoListPrismaOptions({
      filter: {
        name: 'test-name',
        statuses: [TodoStatus.Completed, TodoStatus.InProgress],
      },
      sortBy: 'dueDate',
      orderBy: 'asc',
    });
    expect(prismaOptions).toEqual({
      where: {
        name: {
          contains: 'test-name',
        },
        status: {
          in: [PrismaTodoStatus.Completed, PrismaTodoStatus.InProgress],
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });
  });
});
