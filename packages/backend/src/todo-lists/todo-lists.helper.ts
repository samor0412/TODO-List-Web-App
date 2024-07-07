import {
  TodoList as PrismaTodoList,
  Todo as PrismaTodo,
  TodoStatus as PrismaTodoStatus,
} from '@prisma/client';
import { TodoList } from './entities/todo-list.entity';
import { Todo, TodoStatus } from '../todos/entities/todo.entity';
import { QueryOptions } from 'src/constants/query';

const TodoStatusPrismaMap = {
  [TodoStatus.NotStarted]: PrismaTodoStatus.NotStarted,
  [TodoStatus.InProgress]: PrismaTodoStatus.InProgress,
  [TodoStatus.Completed]: PrismaTodoStatus.Completed,
};

export function transformTodoList(
  prismaTodoList?: PrismaTodoList & { todos: PrismaTodo[] },
): TodoList {
  if (!prismaTodoList) {
    return null;
  }

  const todoList = new TodoList();
  todoList.id = prismaTodoList.id;
  todoList.name = prismaTodoList.name;

  const todos: Todo[] =
    prismaTodoList.todos
      ?.filter((todo) => !todo.isDeleted)
      .map((todo) => {
        const t = new Todo();
        t.id = todo.id;
        t.name = todo.name;
        t.description = todo.description;
        t.dueDate = todo.dueDate;
        t.status = todo.status.toString() as TodoStatus;
        t.listId = todo.listId;
        return t;
      }) || [];
  todoList.todos = todos;

  return todoList;
}

export function prepareGetTodoListPrismaOptions(options?: QueryOptions) {
  const result: any = {};
  const isSorting = options?.sortBy && options?.orderBy;
  const isNameFiltering = options?.filter?.name;
  const isStatusesFiltering = options?.filter?.statuses?.length > 0;

  if (isSorting) {
    result.orderBy = { [options.sortBy]: options.orderBy };
  }

  result.where = {
    ...(isNameFiltering && {
      name: {
        contains: options.filter.name,
      },
    }),
    ...(isStatusesFiltering && {
      status: {
        in: options.filter.statuses.map(
          (status) => TodoStatusPrismaMap[status],
        ),
      },
    }),
  };
  return result;
}
