import { TodoStatus } from 'domains/entities/todo.entities'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import { TODO_STATUS_DISPLAY_MAP } from '../../constants'
import { QueryOptions } from 'api/todo-lists'

interface SubmitData {
  name: string
  statuses: TodoStatus[]
}

interface Props {
  title: string
  submitText: string
  onSubmit: (data: SubmitData) => Promise<void>
  close: () => void
  queryOptions: QueryOptions
}

type Inputs = {
  name: string
  statuses: TodoStatus[]
}

export const TodoFilterPopupContent: React.FC<Props> = ({
  title,
  onSubmit,
  submitText,
  queryOptions
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      name: queryOptions.filter.name,
      statuses: queryOptions.filter.statuses
    }
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
          <label>Status</label>
          <Controller
            name="statuses"
            control={control}
            render={({ field }) => (
              <>
                {Object.entries(TODO_STATUS_DISPLAY_MAP).map(
                  ([value, display]) => {
                    const isChecked = field.value.includes(value as TodoStatus)
                    return (
                      <label key={value} className="label cursor-pointer">
                        <span className="label-text">{display}</span>
                        <input
                          onClick={() => {
                            if (isChecked) {
                              field.onChange(
                                field.value.filter((v) => v !== value)
                              )
                            } else {
                              field.onChange([...field.value, value])
                            }
                          }}
                          type="checkbox"
                          checked={isChecked}
                          className="checkbox"
                        />
                      </label>
                    )
                  }
                )}
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
    </div>
  )
}
