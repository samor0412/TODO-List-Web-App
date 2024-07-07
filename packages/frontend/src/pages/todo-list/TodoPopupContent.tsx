import { Todo, TodoStatus } from 'domains/entities/todo.entities'
import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-date-picker'
import { todoSchema } from 'validation/schemas'
import classnames from 'classnames'
import { TODO_STATUS_DISPLAY_MAP } from '../../constants'
import { Dropdown } from 'components/Dropdown'

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

  return (
    <div className="bg-primary-content bg-origin-content p-6">
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
                <Dropdown
                  options={TODO_STATUS_DISPLAY_MAP}
                  value={field.value}
                  onClick={field.onChange}
                />
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
      {onDelete && (
        <button
          className="btn btn-error mt-3 w-full"
          onClick={async () => {
            if (todo && onDelete) {
              await onDelete(todo?.id)
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}
