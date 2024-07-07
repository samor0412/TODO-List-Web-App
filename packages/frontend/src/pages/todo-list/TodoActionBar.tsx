import React from 'react'
import { TodoPopupContent } from './TodoPopupContent'
import useTodo from 'hooks/useTodo'
import { Popup } from 'components/Popup'

interface Props {
  todoListId: string
  onClickCreate: () => void
}

export const TodoActionBar: React.FC<Props> = ({ todoListId }) => {
  const { create } = useTodo()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = React.useState(false)

  return (
    <div className="my-4 flex">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setIsCreatePopupOpen(true)}
      >
        Create Todo
      </button>
      {isCreatePopupOpen && (
        <Popup>
          <TodoPopupContent
            title="Create Todo"
            onSubmit={async (data) => {
              await create({ listId: todoListId, ...data })
              setIsCreatePopupOpen(false)
            }}
            submitText="Create"
            close={close}
          />
        </Popup>
      )}
    </div>
  )
}
