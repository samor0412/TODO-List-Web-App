import { TodoList } from 'domains/entities/todo-list.entities'
import { TodoStatus } from 'domains/entities/todo.entities'
import { axiosInstance } from 'utils/axios'

export interface QueryOptions {
  filter: {
    name: string
    statuses: TodoStatus[]
  }
  sortBy: string
  orderBy: 'asc' | 'desc'
}

export const create = async (name: string) => {
  const result = await axiosInstance.post<TodoList>('/todo-lists', { name })
  return result.data
}

export const get = async (id: string, options?: QueryOptions) => {
  const result = await axiosInstance.get<TodoList>(`/todo-lists/${id}`, {
    params: {
      sortBy: options?.sortBy,
      orderBy: options?.orderBy,
      filter: options?.filter
    }
  })
  return result.data
}
