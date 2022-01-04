import { Timestamp } from '@google-cloud/firestore';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { BaseController } from 'src/common/controllers/base.controller';
import { Dto } from 'src/common/decorators/dto.decorator';
import { ExceptionResponseDto } from 'src/common/dtos/exception-response.dto';
import { ApiResponse } from 'src/common/entities/api-response.enum';
import { TodosResponseDto } from '../dtos/todos.response.dto';
import { TodosRoute } from '../todos.routes';
import { TodoDocument } from './../documents/todo.document';
import { CreateTodoDto } from './../entities/create-todo.dto';
import { TodosService } from './../todos.service';

@Controller('firebase/todo')
export class FirebaseTodoController extends BaseController {
  constructor(
    private readonly todosService: TodosService
  ) {
    super();
  }

  @ApiOperation({
    description: `Get Todo by identifier`
  })
  @ApiOkResponse({
    type: TodosResponseDto
  })
  @ApiBadRequestResponse({
    description: ApiResponse.BAD_REQUEST,
    type: ExceptionResponseDto
  })
  @Dto(TodosResponseDto)
  @Get(TodosRoute.GET_TODO)
  async getTodo(@Param('todoId') todoId: string): Promise<TodoDocument> {
    try{
      const todo = await this.todosService.get(todoId);
    return todo.data;
    } catch(error){
      this.handleError(error, `Failed to retrieve todo resource with ID: ${todoId}`);
    }
  }

  @Post(TodosRoute.CREATE_TODO)
  @HttpCode(200)
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    try{
      const timestampMillis = Timestamp.fromMillis(createTodoDto.dueDate.getTime())
      const todo = new TodoDocument();
      todo.name = createTodoDto.name;
      todo.dueDate = timestampMillis;
      const newTodo = await this.todosService.create(todo);
      return newTodo.data;
    } catch(error){
      this.handleError(error, `Failed to create todo resource`);
    }
  }
}