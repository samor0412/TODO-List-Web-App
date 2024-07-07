import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { TodoList } from 'domains/entities/todo-list.entities'
import { createContext } from 'react'
import * as todoListsAPI from 'api/todo-lists'
import { TodoStatus } from 'domains/entities/todo.entities'

interface TodoListContext {
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TodoList, Error>>
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
