import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, InternalServerErrorException, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';

export class ExceptionFactory {

  /**
   * 
   * @param error 
   */
  static get(error: any): any {
    let e: any;
    if(error && error.status){
      switch(error.status){
        case HttpStatus.BAD_REQUEST: {
          if(error && error.response){
            error = error.response
          }
          e = new BadRequestException(error);
          return e;
        }
        case HttpStatus.UNAUTHORIZED: {
          if(error && error.response){
            error = error.response
          }
          e = new UnauthorizedException(error);
          return e;
        }
        case HttpStatus.FORBIDDEN: {
          if(error && error.response){
            error = error.response
          }
          e = new ForbiddenException(error);
          return e;
        }
        case HttpStatus.NOT_FOUND: {
          if(error && error.response){
            error = error.response
          }
          e = new NotFoundException(error);
          return e;
        }
        case HttpStatus.CONFLICT: {
          if(error && error.response){
            error = error.response
          }
          e = new ConflictException(error);
          return e;
        }
        case HttpStatus.UNPROCESSABLE_ENTITY: {
          if(error && error.response){
            error = error.response
          }
          e = new UnprocessableEntityException(error);
          return e;
        }
        case HttpStatus.INTERNAL_SERVER_ERROR: {
          if(error && error.response){
            error = error.response
          }
          e = new InternalServerErrorException(error);
          return e;
        }
        default: {
          if(error && error.response){
            error = error.response
          }
          e = new InternalServerErrorException(error);
          return e;
        }
      }
    }
  }
}