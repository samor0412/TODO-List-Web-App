import Header from 'components/Header'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ToDoTable } from './TodoTable'
import { TodoActionBar } from './TodoActionBar'
import useTodoList from 'hooks/useTodoList'
import TodoListsContext from 'context/TodoList'
import useTodoListSocket from 'hooks/useTodoListSocket'

export const TodoListPage: React.FC = () => {
  const { todoListId: id } = useParams<{ todoListId: string }>()
  const { todoList, isLoading, queryOptions, setQueryOptions } = useTodoList({
    id: id || ''
  })
  useTodoListSocket(id || '')
  const onClickCreate = () => {}

  return (
    <TodoListsContext.Provider value={{ queryOptions, setQueryOptions }}>
      <Header title="Todo List Page" backToHome />
      <div className="flex w-full flex-col items-start px-6 pt-6">
        {isLoading ? (
          <span
            data-testid="loading"
            className="loading loading-dots loading-lg"
          ></span>
        ) : (
          <div className="w-full">
            <h1 className="text-3xl">{todoList?.name}</h1>
            <TodoActionBar
              todoListId={todoList?.id || ''}
              onClickCreate={onClickCreate}
            />
            <div>
              <ToDoTable todos={todoList?.todos || []}></ToDoTable>
            </div>
          </div>
        )}
      </div>
    </TodoListsContext.Provider>
  )
}
