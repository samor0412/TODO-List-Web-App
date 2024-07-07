import {
  QueryObserverResult,
  RefetchOptions,
  useQuery
} from '@tanstack/react-query'
import * as todoListsAPI from 'api/todo-lists'
import { TodoList } from 'domains/entities/todo-list.entities'

interface Props {
  id: string
}

interface Return {
  todoList?: TodoList
  isLoading: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TodoList, Error>>
}

const useTodoList = ({ id }: Props): Return => {
  const {
    data: todoList,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['todoList', id],
    queryFn: () => todoListsAPI.get(id!)
  })

  return { todoList, isLoading, refetch }
}

export default useTodoList
