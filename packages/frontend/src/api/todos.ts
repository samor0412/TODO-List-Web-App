import { Todo } from 'domains/entities/todo.entities'
import { axiosInstance } from 'utils/axios'

export const create = async (createDto: Omit<Todo, 'id'>) => {
  const result = await axiosInstance.post<Todo>('/todos', createDto)
  return result.data
}
