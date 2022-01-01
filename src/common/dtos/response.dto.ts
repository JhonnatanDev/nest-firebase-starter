import { Type } from '@nestjs/common'
import { Dto } from './dto'

export abstract class ResponseDto extends Dto {
  /**
   * 
   * @param data 
   */  
  abstract build(data: any): ResponseDto;

  /**
   * 
   * @param data
   * @param target
   */
  protected list(data: any[], target: Type<ResponseDto>): ResponseDto[]{
    const dtos = []
    //Check if is iterable 
    if(!(data.length > 0)){
      return dtos;
    }

    data.forEach((value,key) => {
      dtos[key] = new target().build(value);
    })

    return dtos;
  }

  /**
   * 
   */
  private preserveNulls() {
    for (const [field, value] of Object.entries(this)){
      if(value == null){
        this[field] = null;
      }
    }
  }

  /**
   * 
   */
  protected send(): ResponseDto {
    this.preserveNulls();
    return this;
  }
}