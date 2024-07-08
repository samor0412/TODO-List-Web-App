import { MockInstance } from 'vitest'
import { requestErrorHandler } from './helper'
import { toast } from 'react-toastify'
import { AxiosError, AxiosResponse } from 'axios'

const MOCK_API_NAME = 'TEST_TODO'

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn()
  }
}))

describe('helper', () => {
  describe('requestErrorHandler', () => {
    let spyTodoError: MockInstance

    beforeEach(() => {
      spyTodoError = vi.spyOn(toast, 'error').mockReturnValue('')
    })
    it('should call toastify error when 404', () => {
      requestErrorHandler(
        MOCK_API_NAME,
        new AxiosError(undefined, '404', undefined, undefined, {
          status: 404
        } as AxiosResponse)
      )
      expect(spyTodoError).toHaveBeenCalledWith(`${MOCK_API_NAME} not found`)
    })
    it('should call toastify error when 400', () => {
      requestErrorHandler(
        MOCK_API_NAME,
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: 400,
          data: { message: 'test error' }
        } as AxiosResponse)
      )
      expect(spyTodoError).toHaveBeenCalledWith(`Bad request: test error`)
    })
    it('should call toastify error when 409', () => {
      requestErrorHandler(
        MOCK_API_NAME,
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: 409,
          data: { message: 'test error' }
        } as AxiosResponse)
      )
      expect(spyTodoError).toHaveBeenCalledWith(`Conflict: test error`)
    })
    it('should call toastify error when non axios error', () => {
      requestErrorHandler(MOCK_API_NAME, new Error('test'))
      expect(spyTodoError).toHaveBeenCalledWith(`Something went wrong`)
    })
  })
})
