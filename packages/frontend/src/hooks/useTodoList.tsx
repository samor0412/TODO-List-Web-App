import { useQuery } from '@tanstack/react-query'
import * as todoListsAPI from 'api/todo-lists'
import { TodoList } from 'domains/entities/todo-list.entities'

interface Props {
  id: string
}

interface Return {
  todoList?: TodoList
  isLoading: boolean
}

const useTodoList = ({ id }: Props): Return => {
  const { data: todoList, isLoading } = useQuery({
    queryKey: ['todoList', id],
    queryFn: () => todoListsAPI.get(id!)
  })

  return { todoList, isLoading }
}

export default useTodoList
