import dayjs from 'dayjs'
import { Todo } from 'domains/entities/todo.entities'
import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import { TodoPopupContent } from './TodoPopupContent'
import useTodo from 'hooks/useTodo'

interface Props {
  todos: Todo[]
}

export const ToDoTable: React.FC<Props> = ({ todos }) => {
  const [todo, setTodo] = useState<Todo>()
  const { update, remove } = useTodo()
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th>{todo.name}</th>
              <th>{dayjs(todo.dueDate).format('YYYY-MM-DD')}</th>
              <th>{todo.status}</th>
              <th>
                <button className="btn" onClick={() => setTodo(todo)}>
                  Detail
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <Popup open={!!todo} onClose={() => setTodo(undefined)}>
        <TodoPopupContent
          title="Todo Detail"
          todo={todo}
          onSubmit={async (formTodo) => {
            if (todo) {
              await update({ id: todo.id, listId: todo.listId, ...formTodo })
            }
            setTodo(undefined)
          }}
          onDelete={async (id) => {
            await remove(id)
            setTodo(undefined)
          }}
          close={() => setTodo(undefined)}
          submitText="Update"
        />
      </Popup>
    </div>
  )
}
