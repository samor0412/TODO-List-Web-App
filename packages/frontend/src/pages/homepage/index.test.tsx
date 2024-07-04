import {render, screen} from '@testing-library/react'
import HomePage from '.'

describe.skip('HomePage', () => {
    it('should render', () => {
        render(<HomePage/>)

        expect(screen.getByText('Todo Webapp')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Create New Todo Page'})).toBeInTheDocument()
    })
})