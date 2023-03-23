import { StatusCodes } from 'http-status-codes'

export class AppError extends Error {
  public status: StatusCodes
  public message: string
  public name: string
  public stack?: string | undefined

  constructor (status: number, message: string, name?: string | undefined, stack?: string) {
    super()
    this.status = status
    this.message = message
    this.name = name || 'Errore'
    this.stack = stack
  }
}

export class ProductionError extends AppError {
  constructor (public status: StatusCodes, public message: string, public name: string) {
    super(status, message, name)
  }
}
