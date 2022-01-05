import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { MaxLength, IsDate} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
        example: 'Pet the dog',
        description: 'The todos name',
  })
  @MaxLength(10)
  name: string;

  @ApiProperty({
    example: '01/01/2030',
    description: 'The due date to accomplish the todo',
  })
  @Transform((({ value }) => new Date(value)))
  @IsDate()
  dueDate: Date;
}