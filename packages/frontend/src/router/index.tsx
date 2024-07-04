import Homepage from 'pages/homepage'
import { TodoListPage } from 'pages/todo-list'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />
  },
  {
    path: '/todo-lists/:todoListId',
    element: <TodoListPage />
  }
])

export default router
