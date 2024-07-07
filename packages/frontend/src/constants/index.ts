import { TodoStatus } from 'domains/entities/todo.entities'

export const TODO_STATUS_DISPLAY_MAP = {
  [TodoStatus.NotStarted]: 'Not Started',
  [TodoStatus.InProgress]: 'In Progress',
  [TodoStatus.Completed]: 'Completed'
}

export const TODO_FIELD_DISPLAY_MAP = {
  name: 'Name',
  description: 'Description',
  dueDate: 'Due Date',
  status: 'Status'
}

export const ORDER_BY_DISPLAY_MAP = {
  asc: 'Ascending',
  desc: 'Descending'
}
