import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { FirebaseTodoController } from './controllers/todos.firebase.controller';
@Module({
  imports: [
  ],
  controllers: [FirebaseTodoController],
  providers: [TodosService],
  exports: [TodosService]
})
export class TodosModule {}
