export enum TodoStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export class Todo {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  status: TodoStatus;
  listId: string;
}
