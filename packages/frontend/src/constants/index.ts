import { TodoStatus } from 'domains/entities/todo.entities'

export const TODO_STATUS_DISPLAY_MAP = {
  NotStarted: TodoStatus.NotStarted,
  InProgress: TodoStatus.InProgress,
  Completed: TodoStatus.Completed
}
