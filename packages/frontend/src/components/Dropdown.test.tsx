import { render, screen, waitFor } from '@testing-library/react'
import { Dropdown } from './Dropdown'
import userEvent from '@testing-library/user-event'

describe('Dropdown', () => {
  it('should render', () => {
    render(
      <Dropdown
        value="NotStarted"
        options={{
          NotStarted: 'Not Started'
        }}
        onClick={vi.fn()}
      />
    )
    expect(screen.getByText('Not Started')).toBeInTheDocument()
  })

  it('should call onClick with value when clicked', async () => {
    const onClick = vi.fn()
    render(
      <Dropdown
        value="NotStarted"
        options={{
          NotStarted: 'Not Started',
          InProgress: 'In Progress'
        }}
        onClick={onClick}
      />
    )
    userEvent.click(screen.getByTestId('dropdown'))
    await waitFor(() =>
      expect(screen.getByText('In Progress')).toBeInTheDocument()
    )
    userEvent.click(screen.getByText('In Progress'))
    await waitFor(() => expect(onClick).toHaveBeenCalledWith('InProgress'))
  })
})
