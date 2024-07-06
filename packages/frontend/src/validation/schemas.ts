import { TodoStatus } from 'domains/entities/todo.entities'
import * as yup from 'yup'

const todoSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  dueDate: yup.date().required('Due Date is required'),
  status: yup
    .mixed<
      TodoStatus.Completed | TodoStatus.InProgress | TodoStatus.NotStarted
    >()
    .required('Status is required')
    .oneOf(
      [
        'NotStarted' as TodoStatus.NotStarted,
        'InProgress' as TodoStatus.InProgress,
        'Completed' as TodoStatus.Completed
      ],
      'Status must be one of NotStarted, InProgress, Completed'
    )
})

export { todoSchema }
