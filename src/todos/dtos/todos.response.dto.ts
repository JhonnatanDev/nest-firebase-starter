import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { SwaggerExamples } from 'src/common/helpers/swagger-examples.helper';
import { TodoDocument } from '../documents/todo.document';

export class TodosResponseDto extends ResponseDto {
  
  @ApiProperty({
    example: 'Feed the dog',
    description: 'Todo name',
  })
  name: string;

  @ApiProperty({
    example: SwaggerExamples.TIMESTAMP,
    description: 'Due date for the todo to be completed',
  })
  dueDate: Date;
  build(todo: TodoDocument): ResponseDto
  {
    this.name = todo.name;
    this.dueDate = todo.dueDate.toDate();
    return this.send();
  }
}