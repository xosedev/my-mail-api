import { Error } from './error.interface'

export interface ServicesResponse {
  system: string
  function: string
  data?: object
  error?: Error
}
