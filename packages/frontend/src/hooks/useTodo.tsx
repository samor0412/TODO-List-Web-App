import { useMutation } from '@tanstack/react-query'
import * as todosAPI from 'api/todos'
import TodoListContext from 'context/TodoList'
import { Todo } from 'domains/entities/todo.entities'
import { useContext } from 'react'

interface Return {
  create: (data: Omit<Todo, 'id'>) => Promise<void>
  update: (data: Todo) => Promise<Todo>
  remove: (id: string) => Promise<void>
}

const useTodo = (): Return => {
  const { refetch: refetchTodoList } = useContext(TodoListContext)
  const { mutateAsync: create } = useMutation({
    mutationFn: async (data: Omit<Todo, 'id'>) => {
      await todosAPI.create(data)
      if (refetchTodoList) {
        await refetchTodoList()
      }
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: async (data: Todo) => {
      const result = await todosAPI.update(data)
      if (refetchTodoList) {
        await refetchTodoList()
      }
      return result
    }
  })

  const { mutateAsync: remove } = useMutation({
    mutationFn: async (id: string) => {
      await todosAPI.remove(id)
      if (refetchTodoList) {
        await refetchTodoList()
      }
    }
  })

  return { create, update, remove }
}

export default useTodo
