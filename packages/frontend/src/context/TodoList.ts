import { createContext } from 'react'
import * as todoListsAPI from 'api/todo-lists'
import { TodoStatus } from 'domains/entities/todo.entities'

interface TodoListContext {
  queryOptions: todoListsAPI.QueryOptions
  setQueryOptions: (queryOptions: todoListsAPI.QueryOptions) => void
}

const TodoListContext = createContext<TodoListContext>({
  queryOptions: {
    filter: {
      name: '',
      statuses: [
        TodoStatus.Completed,
        TodoStatus.InProgress,
        TodoStatus.NotStarted
      ]
    },
    sortBy: 'dueDate',
    orderBy: 'asc'
  },
  setQueryOptions: () => {}
})

export default TodoListContext
