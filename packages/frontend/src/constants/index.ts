import { TodoStatus } from 'domains/entities/todo.entities'

export const TODO_STATUS_DISPLAY_MAP = {
  [TodoStatus.NotStarted]: 'Not Started',
  [TodoStatus.InProgress]: 'In Progress',
  [TodoStatus.Completed]: 'Completed',
}
