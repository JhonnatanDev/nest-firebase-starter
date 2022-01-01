import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type } from '@nestjs/common';
import { ResponseDtoBuilder } from '../builders/response-dto.builder';
import { ResponseDto } from '../dtos/response.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DtoInterceptor<T> implements NestInterceptor<T, ResponseDto> {
  /**
   * 
   */
  private target: Type<ResponseDto>;
  
  /**
   * 
   * @param target 
   */
  constructor(target: Type<ResponseDto>){
    this.target = target;
  }

  /**
   * 
   * @param context 
   * @param next 
   * @returns 
   */
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseDto> {
      return next.handle().pipe(map(data => ResponseDtoBuilder.build(data, this.target)));
  }
}