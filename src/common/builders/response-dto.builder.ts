import { Type } from '@Nestjs/common';
import { ResponseDto } from '../dtos/response.dto';
import { ExceptionFactory } from '../factories/exception.factory';

export class ResponseDtoBuilder {
  /**
   * 
   * @param data 
   * @param target 
   * @returns 
   */
  static build(
    data: any,
    target: Type<ResponseDto>
  ): ResponseDto {
    if (data instanceof Error){
      throw ExceptionFactory.get(data);
    }

    let response = null;

    if(data != null){
      response = new target().build(data);
    }
    
    return response;
  }
}