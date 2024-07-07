import * as React from 'react'
import { render, screen, waitFor, within, act } from '@testing-library/react'
import { TodoListPage } from '.'
import { reactQueryWrapper } from '../../test/helpers'
import userEvent from '@testing-library/user-event'
import * as todoAPI from '../../api/todos'

const mockUseContextReturn = {
  refetch: vi.fn(),
  queryOptions: {
    sortBy: 'dueDate',
    orderBy: 'asc',
    filter: {
      name: '',
      statuses: []
    }
  },
  setQueryOptions: vi.fn()
}
vi.mock('react', async (importOriginal) => {
  const mod = (await importOriginal()) as Record<string, unknown>
  return {
    ...mod,
    useContext: vi.fn(() => mockUseContextReturn)
  }
})

vi.mock('../../components/Header', async () => {
  return {
    default: () => <></>
  }
})
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

vi.mock('../../api/todos', async (importOriginal) => {
  const mod = (await importOriginal()) as Record<string, unknown>
  return {
    ...mod,
    update: () =>
      Promise.resolve({
        id: 'id1',
        description: 'description1',
        dueDate: '2020-07-10T07:00:00.000Z',
        listId: 'test-id',
        name: 'name1',
        status: 'Completed'
      })
  }
})

describe('TodoListPage', () => {
  describe('query', () => {
    it('should render TodoListPage with data when query is successful', async () => {
      render(reactQueryWrapper({ children: <TodoListPage /> }))
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      )
      expect(screen.getByText('name1'))
      expect(screen.getByText('Completed'))
      expect(screen.getByText('2020-07-10'))
    }),
      it('should set filter when submitting in filter popup', async () => {
        const mockSetQueryOptions = vi.fn()
        vi.spyOn(React, 'useContext').mockReturnValue({
          ...mockUseContextReturn,
          setQueryOptions: mockSetQueryOptions
        })

        render(reactQueryWrapper({ children: <TodoListPage /> }))
        act(() => {
          screen.getByRole('button', { name: 'Filter' }).click()
        })
        const form = screen.getByRole('form')
        userEvent.type(within(form).getByRole('textbox'), 'testName')

        // disable NotStarted
        userEvent.click(
          screen.getByRole('checkbox', {
            name: /not started/i
          })
        )
        userEvent.click(within(form).getByRole('button', { name: 'Submit' }))

        await waitFor(() =>
          expect(mockSetQueryOptions).toHaveBeenCalledWith({
            filter: {
              name: '',
              statuses: ['Completed', 'InProgress']
            },
            orderBy: 'asc',
            sortBy: 'dueDate'
          })
        )
      })
  })
  describe('create', () => {
    it('should show create todo popup when clicking create', async () => {
      render(reactQueryWrapper({ children: <TodoListPage /> }))
      act(() => {
        screen.getByRole('button', { name: 'Create Todo' }).click()
      })
      const form = screen.getByRole('form')
      expect(within(form).getByText('Name')).toBeInTheDocument()
      expect(within(form).getByText('Description')).toBeInTheDocument()
      expect(within(form).getByText('Status')).toBeInTheDocument()
      expect(within(form).getByText('Due Date')).toBeInTheDocument()
      expect(
        within(form).getByRole('button', { name: 'Create' })
      ).toBeInTheDocument()
    })
  })
  describe('update', () => {
    it('should show update todo popup when clicking create', async () => {
      render(reactQueryWrapper({ children: <TodoListPage /> }))
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      )
      act(() => {
        screen.getByRole('button', { name: 'Detail' }).click()
      })
      const form = screen.getByRole('form')
      expect(within(form).getByText('Name')).toBeInTheDocument()
      expect(within(form).getByText('Description')).toBeInTheDocument()
      expect(within(form).getByText('Status')).toBeInTheDocument()
      expect(within(form).getByText('Due Date')).toBeInTheDocument()
      expect(
        within(form).getByRole('button', { name: 'Update' })
      ).toBeInTheDocument()
    })
    it('should send request when clicking update', async () => {
      const spyUpdate = vi.spyOn(todoAPI, 'update')
      const mockRefetchTodoLists = vi.fn()
      vi.spyOn(React, 'useContext').mockReturnValue({
        ...mockUseContextReturn,
        refetch: mockRefetchTodoLists
      })

      render(reactQueryWrapper({ children: <TodoListPage /> }))
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      )
      act(() => {
        screen.getByRole('button', { name: 'Detail' }).click()
      })
      const form = screen.getByRole('form')
      within(form).getByText('Name')

      const nameInput = within(form)
        .getAllByRole('textbox')
        .find((el) => el.getAttribute('name') === 'name')
      expect(nameInput).toBeInTheDocument()
      userEvent.type(nameInput!, 'changed-name')

      const descriptionInput = within(form)
        .getAllByRole('textbox')
        .find((el) => el.getAttribute('name') === 'description')
      expect(descriptionInput).toBeInTheDocument()
      userEvent.type(descriptionInput!, 'changed-description')

      within(form).getByRole('button', { name: 'Update' }).click()

      await waitFor(() =>
        expect(spyUpdate).toHaveBeenCalledWith({
          id: 'id1',
          description: 'description1',
          dueDate: new Date('2020-07-10T07:00:00.000Z'),
          listId: 'test-id',
          name: 'name1',
          status: 'Completed'
        })
      )
      expect(mockRefetchTodoLists).toHaveBeenCalled()
    })
    it('should send delete request when clicking delete', async () => {
      const mockRefetchTodoLists = vi.fn()
      vi.spyOn(React, 'useContext').mockReturnValue({
        ...mockUseContextReturn,
        refetch: mockRefetchTodoLists
      })
      const spyDelete = vi.spyOn(todoAPI, 'remove').mockResolvedValue()

      render(reactQueryWrapper({ children: <TodoListPage /> }))
      await waitFor(() =>
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      )

      screen.getByRole('button', { name: 'Detail' }).click()

      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: 'Delete' })
        ).toBeInTheDocument()
      )
      screen.getByRole('button', { name: 'Delete' }).click()
      await waitFor(() => expect(spyDelete).toHaveBeenCalledWith('id1'))
      expect(mockRefetchTodoLists).toHaveBeenCalled()
    })
  })
})
