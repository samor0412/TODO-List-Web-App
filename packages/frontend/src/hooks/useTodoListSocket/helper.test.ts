import { QueryClient } from '@tanstack/react-query'
import { onTodoDeleted, onTodoUpdated, onTodoCreated } from './helper'
import { Todo, TodoStatus } from 'domains/entities/todo.entities'
import { TodoList } from 'domains/entities/todo-list.entities'

describe('onTodoUpdated', () => {
  it('should setQueryData with new todo', () => {
    let key
    let callback: any

    const mockTodo: Todo = {
      id: '1',
      name: 'Todo 1',
      description: 'Todo 1 description',
      dueDate: new Date(),
      status: TodoStatus.Completed,
      listId: '1'
    }
    const mockOldTodoList: TodoList = {
      id: '1',
      name: 'Todo List 1',
      todos: [{ ...mockTodo, description: 'New' }]
    }

    const mockQueryClient = {
      setQueryData: (_key: any, _callback: any) => {
        key = _key
        callback = _callback
      }
    }
    onTodoUpdated(mockQueryClient as unknown as QueryClient)(mockTodo)
    expect(key).toStrictEqual(['todoList', mockTodo.listId])

    expect(callback).toBeInstanceOf(Function)
    expect(callback(mockOldTodoList)).toStrictEqual({
      ...mockOldTodoList,
      todos: [mockTodo]
    })
  })
})

describe('onTodoDeleted', () => {
  it('should remove todo By setQueryData', () => {
    let key
    let callback: any
    const mockTodo: Todo = {
      id: '1',
      name: 'Todo 1',
      description: 'Todo 1 description',
      dueDate: new Date(),
      status: TodoStatus.Completed,
      listId: '1'
    }
    const mockOldTodoList: TodoList = {
      id: '1',
      name: 'Todo List 1',
      todos: [mockTodo]
    }
    const mockQueryClient = {
      setQueryData: (_key: any, _callback: any) => {
        key = _key
        callback = _callback
      }
    }
    onTodoDeleted(mockQueryClient as unknown as QueryClient)(mockTodo)
    expect(key).toStrictEqual(['todoList', mockTodo.listId])
    expect(callback).toBeInstanceOf(Function)
    expect(callback(mockOldTodoList)).toStrictEqual({
      ...mockOldTodoList,
      todos: []
    })
  })
})

describe('onTodoCreated', () => {
  it('should setQueryData with new todo', () => {
    let key
    let callback: any
    const mockTodo: Todo = {
      id: '1',
      name: 'Todo 1',
      description: 'Todo 1 description',
      dueDate: new Date(),
      status: TodoStatus.Completed,
      listId: '1'
    }
    const mockOldTodoList: TodoList = {
      id: '1',
      name: 'Todo List 1',
      todos: []
    }
    const mockQueryClient = {
      setQueryData: (_key: any, _callback: any) => {
        key = _key
        callback = _callback
      }
    }
    onTodoCreated(mockQueryClient as unknown as QueryClient)(mockTodo)
    expect(key).toStrictEqual(['todoList', mockTodo.listId])
    expect(callback).toBeInstanceOf(Function)
    expect(callback(mockOldTodoList)).toStrictEqual({
      ...mockOldTodoList,
      todos: [mockTodo]
    })
  })
})