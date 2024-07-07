import React, { useContext } from 'react'
import { TodoPopupContent } from './TodoPopupContent'
import useTodo from 'hooks/useTodo'
import { Popup } from 'components/Popup'
import TodoListContext from 'context/TodoList'
import { Dropdown } from 'components/Dropdown'
import { ORDER_BY_DISPLAY_MAP, TODO_FIELD_DISPLAY_MAP } from '../../constants'
import SortingIcon from 'assets/sorting.svg?react'

interface Props {
  todoListId: string
  onClickCreate: () => void
}

export const TodoActionBar: React.FC<Props> = ({ todoListId }) => {
  const { queryOptions, setQueryOptions } = useContext(TodoListContext)
  const { create } = useTodo()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = React.useState(false)

  return (
    <div className="my-4 flex items-center justify-between">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setIsCreatePopupOpen(true)}
      >
        Create Todo
      </button>
      <div className="flex gap-3">
        <Dropdown
          icon={
            <SortingIcon
              width={16}
              height={16}
              className="fill-neutral-content"
            />
          }
          options={TODO_FIELD_DISPLAY_MAP}
          value={queryOptions.sortBy}
          onClick={(value) =>
            setQueryOptions({ ...queryOptions, sortBy: value })
          }
        />
        <Dropdown
          icon={
            <SortingIcon
              width={16}
              height={16}
              className="fill-neutral-content"
            />
          }
          options={ORDER_BY_DISPLAY_MAP}
          value={queryOptions.orderBy}
          onClick={(value) =>
            setQueryOptions({
              ...queryOptions,
              orderBy: value as 'asc' | 'desc'
            })
          }
        />
      </div>
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
