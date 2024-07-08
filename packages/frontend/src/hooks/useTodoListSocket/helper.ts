import { QueryClient } from '@tanstack/react-query'
import { TodoList } from 'domains/entities/todo-list.entities'
import { Todo } from 'domains/entities/todo.entities'
import { toast } from 'react-toastify'

export const onTodoUpdated = (queryClient: QueryClient) => (todo: Todo) => {
  queryClient.setQueryData(
    ['todoList', todo.listId],
    (oldTodoList: TodoList) => {
      toast.info('📝  Todo updated')
      if (oldTodoList) {
        const newTodos = oldTodoList.todos.map((t) => {
          if (t.id === todo.id) {
            return todo
          }
          return t
        })
        const newTodoList = { ...oldTodoList, todos: newTodos }
        return newTodoList
      }
      return oldTodoList
    }
  )
}

export const onTodoDeleted = (queryClient: QueryClient) => (todo: Todo) => {
  queryClient.setQueryData(
    ['todoList', todo.listId],
    (oldTodoList: TodoList) => {
      toast.success('🧹  Todo Deleted')
      if (oldTodoList) {
        const newTodoList = {
          ...oldTodoList,
          todos: oldTodoList.todos.filter((t) => t.id !== todo.id)
        }
        return newTodoList
      }
      return oldTodoList
    }
  )
}

export const onTodoCreated = (queryClient: QueryClient) => (todo: Todo) => {
  queryClient.setQueryData(
    ['todoList', todo.listId],
    (oldTodoList: TodoList) => {
      toast.success('🎉  Todo Created')
      if (oldTodoList) {
        const newTodoList = {
          ...oldTodoList,
          todos: oldTodoList.todos.concat([todo])
        }
        return newTodoList
      }
      return oldTodoList
    }
  )
}
