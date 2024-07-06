import { useMutation } from '@tanstack/react-query'
import * as todosAPI from 'api/todos'
import { Todo } from 'domains/entities/todo.entities'

interface Return {
  create: (data: Omit<Todo, 'id'>) => Promise<void>
}

const useTodo = (): Return => {
  const { mutateAsync: create } = useMutation({
    mutationFn: async (data: Omit<Todo, 'id'>) => {
      await todosAPI.create(data)
    }
  })

  return { create }
}

export default useTodo
