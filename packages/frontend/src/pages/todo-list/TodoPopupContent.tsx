import { Todo, TodoStatus } from 'domains/entities/todo.entities'
import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-date-picker'
import { todoSchema } from 'validation/schemas'
import classnames from 'classnames'
import { TODO_STATUS_DISPLAY_MAP } from '../../constants'

interface Props {
  title: string
  submitText: string
  onSubmit: (todo: Omit<Todo, 'id' | 'listId'>) => Promise<void>
  onDelete?: (todo: string) => Promise<void>
  close: () => void
  todo?: Todo
}

type Inputs = {
  name: string
  description: string
  dueDate: Date
  status: TodoStatus
}

export const TodoPopupContent: React.FC<Props> = ({
  title,
  onSubmit,
  onDelete,
  submitText,
  todo
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      name: todo?.name,
      description: todo?.description,
      dueDate: todo?.dueDate,
      status: todo?.status || TodoStatus.NotStarted
    },
    resolver: yupResolver(todoSchema)
  })

  const closeStatusDropdown = useCallback(() => {
    document.getElementById('status-dropdown')?.removeAttribute('open')
  }, [])

  return (
    <div
      className="bg-primary-content bg-origin-content p-6"
      onClick={closeStatusDropdown}
    >
      <h1 className="mb-6">{title}</h1>
      <form
        className={classnames([
          'flex flex-col gap-4',
          '[&>div]:flex [&>div]:flex-col [&>div]:gap-2',
          '[&_p]:text-sm [&_p]:text-warning'
        ])}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>Name</label>
          <input className="input" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label>Description</label>
          <input className="input" {...register('description')} />
          <p>{errors.description?.message}</p>
        </div>
        <div>
          <label>Due Date</label>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker onChange={field.onChange} value={field.value} />
                <p>{errors.dueDate?.message}</p>
              </>
            )}
          />
        </div>
        <div>
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <>
                <details className="dropdown">
                  <summary className="btn m-1 w-full">{field.value}</summary>
                  <ul className="menu dropdown-content dropdown-hover z-[1] m-1 w-52 rounded-md bg-base-100 p-2 shadow">
                    {Object.entries(TODO_STATUS_DISPLAY_MAP).map(
                      ([value, display]) => (
                        <li
                          className="py-2 pl-2"
                          key={value}
                          onClick={() => {
                            field.onChange(value)
                            closeStatusDropdown()
                          }}
                        >
                          {display}
                        </li>
                      )
                    )}
                  </ul>
                </details>
                <p>{errors.status?.message}</p>
              </>
            )}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary mt-5"
          value={submitText}
        />
      </form>
      <button
        className="btn btn-error mt-3 w-full"
        onClick={async () => {
          if (todo && onDelete) {
            await onDelete(todo?.id)
            closeStatusDropdown()
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}
