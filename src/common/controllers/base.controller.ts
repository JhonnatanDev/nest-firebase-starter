import { Controller, InternalServerErrorException } from '@nestjs/common';
import { ApiDefaultResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiResponse } from '../entities/api-response.enum';

@ApiOkResponse({
  description: ApiResponse.OK
})
@ApiInternalServerErrorResponse({
  description: ApiResponse.INTERNAL_SERVER_ERROR,
})
@ApiDefaultResponse({
  description: ApiResponse.INTERNAL_SERVER_ERROR,
})
@Controller()
export abstract class BaseController {
  protected handleError = (error : any, message: string) => {
    if(error.status){
      throw error;
    }
    throw new InternalServerErrorException(message)
  }
}