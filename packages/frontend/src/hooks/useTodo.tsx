import { useMutation } from '@tanstack/react-query'
import * as todosAPI from 'api/todos'
import { Todo } from 'domains/entities/todo.entities'

interface Return {
  create: (data: Omit<Todo, 'id'>) => Promise<void>
  update: (data: Todo) => Promise<Todo | undefined>
  remove: (id: string) => Promise<void>
}

const useTodo = (): Return => {
  const { mutateAsync: create } = useMutation({
    mutationFn: async (data: Omit<Todo, 'id'>) => {
      await todosAPI.create(data)
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: async (data: Todo) => {
      const result = await todosAPI.update(data)
      return result
    }
  })

  const { mutateAsync: remove } = useMutation({
    mutationFn: async (id: string) => {
      await todosAPI.remove(id)
    }
  })

  return { create, update, remove }
}

export default useTodo
