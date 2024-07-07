import { useMutation } from '@tanstack/react-query'
import * as todosAPI from 'api/todos'
import { Todo } from 'domains/entities/todo.entities'

interface Return {
  create: (data: Omit<Todo, 'id'>) => Promise<void>
  update: (data: Todo) => Promise<Todo>
}

const useTodo = (): Return => {
  const { mutateAsync: create } = useMutation({
    mutationFn: async (data: Omit<Todo, 'id'>) => {
      await todosAPI.create(data)
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: async (data: Todo) => {
      return todosAPI.update(data)
    }
  })

  return { create, update }
}

export default useTodo
