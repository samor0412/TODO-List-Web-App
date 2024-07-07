import React, { useContext } from 'react'
import { TodoPopupContent } from './TodoPopupContent'
import useTodo from 'hooks/useTodo'
import { Popup } from 'components/Popup'
import TodoListContext from 'context/TodoList'
import { Dropdown } from 'components/Dropdown'
import { ORDER_BY_DISPLAY_MAP, TODO_FIELD_DISPLAY_MAP } from '../../constants'
import SortingIcon from 'assets/sorting.svg?react'
import { TodoFilterPopupContent } from './TodoFilterPopupContent'

interface Props {
  todoListId: string
  onClickCreate: () => void
}

export const TodoActionBar: React.FC<Props> = ({ todoListId }) => {
  const { queryOptions, setQueryOptions } = useContext(TodoListContext)
  const { create } = useTodo()
  const [isCreatePopupOpen, setIsCreatePopupOpen] = React.useState(false)
  const [isFilterPopupOpen, setIsFilterPopupOpen] = React.useState(false)

  return (
    <div className="my-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-0">
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setIsCreatePopupOpen(true)}
      >
        Create Todo
      </button>
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn" onClick={() => setIsFilterPopupOpen(true)}>
          Filter
        </button>
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
      {isFilterPopupOpen && (
        <Popup>
          <TodoFilterPopupContent
            title="Filter"
            queryOptions={queryOptions}
            onSubmit={async (data) => {
              setQueryOptions({
                ...queryOptions,
                filter: {
                  name: data.name,
                  statuses: data.statuses
                }
              })
              setIsFilterPopupOpen(false)
            }}
            submitText="Submit"
            close={close}
          />
        </Popup>
      )}
    </div>
  )
}
