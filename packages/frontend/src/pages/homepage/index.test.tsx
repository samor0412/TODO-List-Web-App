import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '.'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { reactQueryWrapper } from 'test/helpers'

vi.mock('../../api/todo-lists', async (importOriginal) => {
  const mod = (await importOriginal()) as Record<string, unknown>
  return {
    ...mod,
    create: vi.fn(() => Promise.resolve({ data: { id: 'test-id' } }))
  }
})

describe('HomePage', () => {
  it('should render', () => {
    render(
      reactQueryWrapper({
        children: (
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        )
      })
    )

    expect(screen.getByText('Todo Webapp')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Create New Todo Page' })
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Untitled')).toBeInTheDocument()
  })

  it('should redirect to todo list page', async () => {
    render(
      reactQueryWrapper({
        children: (
          <MemoryRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/todo-lists/:testId"
                element={<div>Todo List Page</div>}
              />
            </Routes>
          </MemoryRouter>
        )
      })
    )
    screen.getByRole('button', { name: 'Create New Todo Page' }).click()

    await waitFor(() =>
      expect(document.body.textContent).toBe('Todo List Page')
    )
  })
})
