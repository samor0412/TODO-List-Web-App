import { Todo } from 'domains/entities/todo.entities'
import { axiosInstance } from 'utils/axios'
import { requestErrorHandler } from './helper'

const API_NAME = 'Todo'
export const create = async (createDto: Omit<Todo, 'id'>) => {
  try {
    const result = await axiosInstance.post<Todo>('/todos', createDto)
    return result.data
  } catch (e) {
    requestErrorHandler(API_NAME, e)
  }
}

export const update = async (updateDto: Todo) => {
  try {
    const result = await axiosInstance.patch<Todo>(
      `/todos/${updateDto.id}`,
      updateDto
    )
    return result.data
  } catch (e) {
    requestErrorHandler(API_NAME, e)
  }
}

export const remove = async (id: string) => {
  try {
    await axiosInstance.delete<Todo>(`/todos/${id}`)
  } catch (e) {
    requestErrorHandler(API_NAME, e)
  }
}
