import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorCode } from '../entities/error-code.enum'

export class ErrorCodeExpception extends HttpException {
  private code: ErrorCode;

  constructor(message: string | any, status: HttpStatus, code: ErrorCode) {
    super(message, status)

    this.code = code;
  }

  getCode(): ErrorCode {
    return this.code;
  }
}