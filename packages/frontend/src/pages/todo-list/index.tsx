import { useQuery } from '@tanstack/react-query'
import Header from 'components/Header'
import React from 'react'
import { useParams } from 'react-router-dom'
import * as todoListsAPI from 'api/todo-lists'
import { ToDoTable } from './TodoTable'

export const TodoListPage: React.FC = () => {
  const { todoListId } = useParams<{ todoListId: string }>()
  const { data, isLoading } = useQuery({
    queryKey: ['todoList', todoListId],
    queryFn: () => todoListsAPI.get(todoListId!)
  })

  return (
    <>
      <Header title="Todo List Page" backToHome />
      <div className="flex w-full flex-col items-start px-6 pt-6">
        {isLoading ? (
          <span data-testid="loading" className="loading loading-dots loading-lg"></span>
        ) : (
          <div className="w-full">
            <h1 className="mb-6 text-3xl">{data?.name}</h1>
            <div>
              <ToDoTable todos={data?.todos || []}></ToDoTable>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
