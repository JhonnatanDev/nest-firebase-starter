import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';

export class ExceptionFactory {

  /**
   * 
   * @param error 
   */
  static get(error: any): any {
    let e: any;
    if(error && error.status){
      if(error && error.response){
        error = error.response
      }
      switch(error.status){
        case HttpStatus.BAD_REQUEST: {
          e = new BadRequestException(error);
          return e;
        }
        case HttpStatus.UNAUTHORIZED: {
          e = new UnauthorizedException(error);
          return e;
        }
        case HttpStatus.FORBIDDEN: {
          e = new ForbiddenException(error);
          return e;
        }
        case HttpStatus.NOT_FOUND: {
          e = new NotFoundException(error);
          return e;
        }
        case HttpStatus.CONFLICT: {
          e = new ConflictException(error);
          return e;
        }
        case HttpStatus.UNPROCESSABLE_ENTITY: {
          e = new UnprocessableEntityException(error);
          return e;
        }
        default: {
          e = new InternalServerErrorException(error);
          return e;
        }
      }
    }
  }
}