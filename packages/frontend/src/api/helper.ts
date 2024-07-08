import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export function requestErrorHandler(apiName: string, error: unknown) {
  if (error instanceof AxiosError) {
    switch (error.response?.status) {
      case 404:
        toast.error(`${apiName} not found`)
        break
      case 400:
        toast.error(`Bad request: ${error.response?.data?.message}`)
        break
      case 409:
        toast.error(`Conflict: ${error.response?.data?.message}`)
        break
      default:
        toast.error(`Something went wrong`)
    }
    return
  }
  toast.error(`Something went wrong`)
}
