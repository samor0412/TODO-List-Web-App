import { useQuery } from '@tanstack/react-query'
import * as todoListsAPI from 'api/todo-lists'
import { TodoList } from 'domains/entities/todo-list.entities'
import { TodoStatus } from 'domains/entities/todo.entities'
import { useEffect, useState } from 'react'

interface Props {
  id: string
}

interface Return {
  todoList?: TodoList
  isLoading: boolean
  queryOptions: todoListsAPI.QueryOptions
  setQueryOptions: (queryOptions: todoListsAPI.QueryOptions) => void
}

const DEFAULT_QUERY_OPTIONS: todoListsAPI.QueryOptions = {
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

  return { todoList, isLoading, queryOptions, setQueryOptions }
}

export default useTodoList
