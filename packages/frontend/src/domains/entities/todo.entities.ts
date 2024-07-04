export type TodoStatus = 'NotStarted' | 'InProgress' | 'Completed'

export interface Todo {
  id: string
  name: string
  description: string
  dueDate: Date
  status: 'NotStarted' | 'InProgress' | 'Completed'
  listId: string
}
