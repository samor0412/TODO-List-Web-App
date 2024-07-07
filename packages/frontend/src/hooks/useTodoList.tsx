import {
  QueryObserverResult,
  RefetchOptions,
  useQuery
} from '@tanstack/react-query'
import * as todoListsAPI from 'api/todo-lists'
import { TodoList } from 'domains/entities/todo-list.entities'
import { useEffect, useState } from 'react'

interface Props {
  id: string
}

interface Return {
  todoList?: TodoList
  isLoading: boolean
  queryOptions: todoListsAPI.QueryOptions
  setQueryOptions: (queryOptions: todoListsAPI.QueryOptions) => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TodoList, Error>>
}

const DEFAULT_QUERY_OPTIONS: todoListsAPI.QueryOptions = {
  sortBy: 'dueDate',
  orderBy: 'asc'
}

const useTodoList = ({ id }: Props): Return => {
  const [queryOptions, _setQueryOptions] = useState<todoListsAPI.QueryOptions>(
    DEFAULT_QUERY_OPTIONS
  )

  const {
    data: todoList,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['todoList', id],
    queryFn: () => todoListsAPI.get(id!, queryOptions)
  })

  useEffect(() => {
    refetch()
  }, [queryOptions, refetch])

  const setQueryOptions = (queryOptions: todoListsAPI.QueryOptions) => {
    _setQueryOptions(queryOptions)
  }

  return { todoList, isLoading, refetch, queryOptions, setQueryOptions }
}

export default useTodoList
