import { useMutation } from '@tanstack/react-query'
import * as TodoListsAPI from 'api/todo-lists'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TODO_LIST_DEFAULT_NAME = 'Untitled'

const HomePage: React.FC = () => {
  const [name, setName] = useState<string>('')
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: async () => {
      const todolist = await TodoListsAPI.create(name || TODO_LIST_DEFAULT_NAME)
      if (todolist) {
        navigate(`todo-lists/${todolist.id}`)
      }
    }
  })

  return (
    <div className="flex h-screen w-screen flex-col items-center pt-10">
      <h2 className="my-24 text-4xl font-bold">Todo Webapp</h2>
      <input
        placeholder={TODO_LIST_DEFAULT_NAME}
        className="input input-bordered my-9 w-full max-w-60 px-3 py-4"
        onChange={(e) => {
          setName(e.target.value)
        }}
        value={name}
      ></input>
      <button
        onClick={() => {
          mutate()
        }}
        className="btn btn-primary"
      >
        Create New Todo Page
      </button>
    </div>
  )
}

export default HomePage
