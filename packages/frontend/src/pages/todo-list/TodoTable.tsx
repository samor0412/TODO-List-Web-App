import dayjs from 'dayjs'
import { Todo } from 'domains/entities/todo.entities'
import React from 'react'

interface Props {
  todos: Todo[]
}

export const ToDoTable: React.FC<Props> = ({ todos }) => {
  return (
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
              <button className="btn">Detail</button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
