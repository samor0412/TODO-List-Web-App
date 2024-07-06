import { TodoList } from 'domains/entities/todo-list.entities'
import { axiosInstance } from 'utils/axios'

export const create = async (name: string) => {
  const result = await axiosInstance.post<TodoList>('/todo-lists', { name })
  return result.data
}

export const get = async (id: string) => {
  const result = await axiosInstance.get<TodoList>(`/todo-lists/${id}`)
  return result.data
}
