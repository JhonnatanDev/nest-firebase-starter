import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: string | any) {
    const body = HttpException.createBody({message: message})
    super(body, HttpStatus.UNPROCESSABLE_ENTITY)
  }
}