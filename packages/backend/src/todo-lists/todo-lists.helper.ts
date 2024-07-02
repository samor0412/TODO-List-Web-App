import { TodoList as PrismaTodoList} from "@prisma/client";
import { TodoList } from "./entities/todo-list.entity";
import { Todo } from "../todos/entities/todo.entity";

export function transformTodoList(prismaTodoList?: PrismaTodoList): TodoList {
    if (!prismaTodoList) {
      return null;
    }

    const todoList = new TodoList();
    todoList.id = prismaTodoList.id;
    todoList.name = prismaTodoList.name;

    const todos: Todo[] =
      todoList.todos?.map((todo) => {
        const t = new Todo();
        t.id = todo.id;
        t.name = todo.name;
        t.description = todo.description;
        t.dueDate = todo.dueDate;
        t.status = todo.status;
        t.listId = todo.listId;
        return t;
      }) || [];
    todoList.todos = todos;

    return todoList;
}