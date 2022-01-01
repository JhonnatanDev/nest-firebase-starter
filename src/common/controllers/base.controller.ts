import { Controller } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiResponse } from '../entities/api-response.enum';

@ApiOkResponse({
  description: ApiResponse.OK
})
@ApiInternalServerErrorResponse({
  description: ApiResponse.INTERNAL_SERVER_ERROR,
})
@Controller()
export abstract class BaseController {}