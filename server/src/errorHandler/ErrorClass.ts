import { StatusCodes } from 'http-status-codes'

export class AppError extends Error {
  constructor (public status: StatusCodes, public message: string) {
    super()
  }
}

export class ProductionError extends AppError {
  constructor (public status: StatusCodes, public message: string) {
    super(status, message)
    this.stack = undefined
  }
}
