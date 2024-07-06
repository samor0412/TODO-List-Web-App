import { Todo } from '../../todos/entities/todo.entity';

export class TodoList {
  id: string;
  name: string;
  todos: Todo[];
}
