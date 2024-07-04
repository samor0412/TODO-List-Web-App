import { Todo } from './todo.entities'

export interface TodoList {
  id: string
  name: string
  todos: Todo[]
}
