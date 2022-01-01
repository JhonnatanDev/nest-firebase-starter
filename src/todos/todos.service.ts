import { FirestoreDocument } from 'src/firestore/firestore.types';
import { TodoDocument } from './documents/todo.document';
import { FirestoreRepository } from 'src/firestore/firestore.repository';
import { COLLECTIONS } from 'src/firestore/firestore.collections';
import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Logger } from '@nestjs/common';
import { Filter } from 'src/common/types/Query.types';
import { mapFilterToFirestoreFilter } from 'src/common/helpers/filter-to-firestore-filter.helper';

export class TodosService {
  private logger: Logger = new Logger(COLLECTIONS.TODOS);
  private readonly todosFirestoreRepository: FirestoreRepository<TodoDocument>
  constructor(
    @Inject(COLLECTIONS.TODOS)  
    private todosCollection: CollectionReference<TodoDocument>,
  ) {
    this.todosFirestoreRepository = new FirestoreRepository<TodoDocument>(todosCollection)
  }

  async create(todo: TodoDocument): Promise<FirestoreDocument<TodoDocument>>{
    return this.todosFirestoreRepository.create(todo);
  }

  async get(id:string): Promise<FirestoreDocument<TodoDocument>>{
    return this.todosFirestoreRepository.get(id);
  }

  async findAll(filters: Filter[]):Promise<FirestoreDocument<TodoDocument>[]>{
    const firestoreFilters = filters.map(filter => mapFilterToFirestoreFilter(filter))
    return this.todosFirestoreRepository.findAll(firestoreFilters);
  }
  
  async update(id: string, todo: TodoDocument): Promise<FirestoreDocument<TodoDocument>>{
    return this.todosFirestoreRepository.update(id, todo);
  }

  async delete(id: string): Promise<string>{
    return this.todosFirestoreRepository.delete(id);
  }

  async upsert(id: string, todo: TodoDocument): Promise<FirestoreDocument<TodoDocument>>{
    return this.todosFirestoreRepository.upsert(id, todo);
  }
}