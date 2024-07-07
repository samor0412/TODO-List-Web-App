import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { TodoList } from 'domains/entities/todo-list.entities'
import { createContext } from 'react'

interface TodoListContext {
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TodoList, Error>>
}

const TodoListContext = createContext<TodoListContext>({})

export default TodoListContext
