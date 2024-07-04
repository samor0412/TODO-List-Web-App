import { render, screen, waitFor } from '@testing-library/react'
import Header from 'components/Header'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('Header', () => {
  it('renders title', () => {
    render(
      <MemoryRouter>
        <Header title="Test Title" />
      </MemoryRouter>
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders back button when backToHome prop is true', () => {
    render(
      <MemoryRouter>
        <Header title="Test Title" backToHome />
      </MemoryRouter>
    )
    expect(
      screen.getByRole('button', { name: 'Back to Home' })
    ).toBeInTheDocument()
  })

  it('calls navigate when back button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/todo-lists/test']}>
        <Routes>
          <Route path="/" element={<div>HomePage</div>} />
          <Route
            path="/todo-lists/:testId"
            element={<Header title="Test Title" backToHome />}
          />
        </Routes>
      </MemoryRouter>
    )
    screen.getByRole('button', { name: 'Back to Home' }).click()
    await waitFor(() => expect(document.body.textContent).toBe('HomePage'))
  })
})
