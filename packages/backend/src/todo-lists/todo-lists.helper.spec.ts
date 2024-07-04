import { Todo as PrismaTodo, TodoList as PrismaTodoList } from "@prisma/client";
import { TodoStatus } from "../todos/entities/todo.entity";
import { transformTodoList } from "./todo-lists.helper";
import { TodoList } from "./entities/todo-list.entity";

describe('transformTodoList', () => {
  it('should transform a prisma todo list to a todo list', () => {
    const mockPrismaTodoList: PrismaTodoList & {todos: PrismaTodo[]} = {
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
      isDeleted: false
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
