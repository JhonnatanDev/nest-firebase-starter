import { ResponseDto } from './response.dto';

export class ExceptionResponseDto extends ResponseDto {
  statusCode: number;
  message: any;
  code: number;


  /**
   * 
   * @param httpStatus 
   * @param message 
   * @param code 
   */
  constructor(httpStatus: number, message: any, code:number){
    super();
    this.statusCode = httpStatus;
    this.message = message;
    this.code = code;
  }

  build(data: any): ResponseDto {
    return this;
  }
}