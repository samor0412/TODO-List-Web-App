export enum TodoStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export interface Todo {
  id: string
  name: string
  description: string
  dueDate: Date
  status: TodoStatus.NotStarted | TodoStatus.InProgress | TodoStatus.Completed
  listId: string
}
