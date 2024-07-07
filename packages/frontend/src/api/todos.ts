import { Todo } from 'domains/entities/todo.entities'
import { axiosInstance } from 'utils/axios'

export const create = async (createDto: Omit<Todo, 'id'>) => {
  const result = await axiosInstance.post<Todo>('/todos', createDto)
  return result.data
}

export const update = async (updateDto: Todo) => {
  const result = await axiosInstance.patch<Todo>(
    `/todos/${updateDto.id}`,
    updateDto
  )
  return result.data
}

export const remove = async (id: string) => {
  const result = await axiosInstance.delete<Todo>(`/todos/${id}`)
  return result.data
}
