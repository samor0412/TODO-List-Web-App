import { render, screen, waitFor } from '@testing-library/react'
import { TodoListPage } from '.'
import { reactQueryWrapper } from '../../test/helpers'

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = (await importOriginal()) as Record<string, unknown>
  return {
    ...mod,
    useParams: vi.fn(() => ({ todoListId: 'test-id' }))
  }
})

vi.mock('../../components/Header', async () => {
  return {
    default: () => <></>
  }
})

vi.mock('../../api/todo-lists', async (importOriginal) => {
  const mod = (await importOriginal()) as Record<string, unknown>
  return {
    ...mod,
    get: () =>
      Promise.resolve({
        id: 'test-id',
        name: 'Test Name',
        todos: [
          {
            id: 'id1',
            description: 'description1',
            dueDate: '2020-07-10T07:00:00.000Z',
            listId: 'test-id',
            name: 'name1',
            status: 'Completed'
          }
        ]
      })
  }
})

describe('TodoListPage', () => {
  it('should render TodoListPage with data when query is successful', async () => {
    render(reactQueryWrapper({ children: <TodoListPage /> }))
    waitFor
    await waitFor(() => expect(screen.queryByTestId('loading')).not.toBeInTheDocument())
    expect(screen.getByText('name1'))
    expect(screen.getByText('Completed'))
    expect(screen.getByText('2020-07-10'))
  })
})
