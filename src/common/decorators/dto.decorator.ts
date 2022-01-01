import { applyDecorators, Type, UseInterceptors } from '@nestjs/common';
import { ResponseDto } from '../dtos/response.dto';
import { DtoInterceptor } from '../interceptors/dto.interceptor';

export function Dto(dto: Type<ResponseDto>){
  return applyDecorators(UseInterceptors(new DtoInterceptor(dto)))
}