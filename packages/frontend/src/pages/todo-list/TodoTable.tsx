import dayjs from 'dayjs'
import { Todo } from 'domains/entities/todo.entities'
import React, { useState } from 'react'
import { TodoPopupContent } from './TodoPopupContent'
import useTodo from 'hooks/useTodo'
import { Popup } from 'components/Popup'

interface Props {
  todos: Todo[]
}

const NAME_LIST = ['Yeung L.', "David J.", "John O.", "Cheryl T."]
const PRICE_LIST = ['$237', "$146", "$651", "$645"]
export const ToDoTable: React.FC<Props> = ({ todos }) => {
  const [todo, setTodo] = useState<Todo>()
  const { update, remove } = useTodo()
  return (
    <div className="min-w-[80%] overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Customer</th>
            <th>Total($)</th>
            <th className="flex justify-end mr-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo, key) => (
            <tr key={todo.id}>
              <th>{todo.name}</th>
              <th>{dayjs(todo.dueDate).format('YYYY-MM-DD')}</th>
              <th>{todo.status}</th>
              <th>{NAME_LIST[key] || 'Yeung L.'}</th>
              <th>{PRICE_LIST[key] || "$437"}</th>
              <th className="flex justify-end">
                <button className="btn" onClick={() => setTodo(todo)}>
                  Detail
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {todo && (
        <Popup onClose={() => setTodo(undefined)}>
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
      )}
    </div>
  )
}
