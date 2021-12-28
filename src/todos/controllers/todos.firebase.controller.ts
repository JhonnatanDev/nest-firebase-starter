import { Timestamp } from '@google-cloud/firestore';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TodoDocument } from './../documents/todo.document';
import { CreateTodoDto } from './../entities/create-todo.dto';
import { TodosService } from './../todos.service';

@Controller('firebase/todo')
export class FirebaseTodoController {
  constructor(
    private readonly todosService: TodosService
  ) {}

  @Get(':id')
  @HttpCode(200)
  async getTodo(@Param() params): Promise<TodoDocument> {
    const { id } = params;
    const todo = await this.todosService.get(id);
    return todo.data;
  }

  @Post()
  @HttpCode(200)
  async createTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    const timestampMillis = Timestamp.fromMillis(createTodoDto.dueDate.getTime())
    const todo = new TodoDocument();
    todo.name = createTodoDto.name;
    todo.dueDate = timestampMillis;
    const newTodo = await this.todosService.create(todo);
    return newTodo.data;
  }
}