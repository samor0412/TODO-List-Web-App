import React from 'react'
import Popup from 'reactjs-popup'
import { TodoPopupContent } from './TodoPopupContent'
import useTodo from 'hooks/useTodo'

interface Props {
  todoListId: string
  onClickCreate: () => void
}

export const TodoActionBar: React.FC<Props> = ({ todoListId }) => {
  const { create } = useTodo()

  return (
    <div className="my-4 flex">
      <Popup
        trigger={
          <button className="btn btn-primary btn-sm">Create Todo</button>
        }
        modal
      >
        {/* @ts-expect-error: wrong type provided by the library */}
        {(close): React.ReactNode => (
          <TodoPopupContent
            title="Create Todo"
            onSubmit={async (data) => {
              await create({ listId: todoListId, ...data })
              close()
            }}
            submitText="Create"
            close={close}
          />
        )}
      </Popup>
    </div>
  )
}
