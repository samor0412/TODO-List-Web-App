import { TodoList } from 'domains/entities/todo-list.entities'
import { axiosInstance } from 'utils/axios'

export interface QueryOptions {
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
      orderBy: options?.orderBy
    }
  })
  return result.data
}
