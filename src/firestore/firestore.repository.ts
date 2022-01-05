import {
  Injectable, InternalServerErrorException, NotFoundException,
} from '@nestjs/common';
import { CollectionReference, DocumentReference, Query, UpdateData } from '@google-cloud/firestore';
import { FirestoreDocument, FirestoreFilter } from './firestore.types';

@Injectable()
export class FirestoreRepository<T> {
  protected collection:CollectionReference<T>;
  constructor( 
    injectedCollection: CollectionReference<T>,
  ) {
    this.collection = injectedCollection
  }

  async create(params: T, documentRef:DocumentReference = null): Promise<FirestoreDocument<T>> {
    const docRef = this.getDocumentReference(documentRef)
    try{
      await docRef.set({id:docRef.id, ...params});
      const documentResponse = await docRef.get();
      return this.createFirestoreDocument(documentResponse);
    } catch(error) {
      this.handleError(error, `Failed to create document in path ${docRef.path}`)
    }
  }

  async findAll(filters: FirestoreFilter[]): Promise<FirestoreDocument<T>[]> {
    try{
      const snapshot = await this.getFirestoreSnapshot(filters);
    const data: FirestoreDocument<T>[] = [];
    snapshot.forEach(doc => {
      const document = this.createFirestoreDocument(doc);
      data.push(document)
    });
    return data;
    } catch(error){
      this.handleError(error, `Failed to retrieve documents at path ${this.collection.path}`)
    }
  }

  async get(id: string, documentRef:DocumentReference = null): Promise<FirestoreDocument<T>> {
    const docRef = this.getDocumentReference(documentRef,id);
    try{
      const documentResponse = await docRef.get();
      if(!documentResponse.exists){
        throw new NotFoundException(`Document in path ${this.collection.path} with ID ${id} not found`)
      }
      return this.createFirestoreDocument(documentResponse);
    } catch(error){
      this.handleError(error, `Failed to retrieve document in path ${docRef.path} with ID ${id}`);
    }
  }

  async update(id: string, model: T, documentRef:DocumentReference = null): Promise<FirestoreDocument<T>> {
    const docRef = this.getDocumentReference(documentRef, id);
    try{
      const documentResponse = await docRef.get();
    if(!documentResponse.exists){
      throw new NotFoundException(`Document in path ${this.collection.path} with ID ${id} not found`)
    }

    Object.keys(model).forEach(
			(key) => model[key] === undefined && delete model[key]
		);
    if (Object.keys(model).length === 0) {
      return null;
    }

    const updateModel = model as UpdateData<T>;
    await docRef.update(updateModel)
    return this.get(id);
    } catch(error){
      this.handleError(error, `Failed to retrieve document in path ${docRef.path} with ID ${id}`);
    }
  }

  async delete(id: string, documentRef:DocumentReference = null): Promise<string>{
    const docRef = this.getDocumentReference(documentRef,id);
    try{
      const getModelResponse = await docRef.get();
			if (!getModelResponse.exists) {
				throw new Error(`Document in path ${this.collection.path} with ID ${id} not found`)
			}
    await docRef.delete();
    return id;
    } catch(error){
      this.handleError(error, `Failed to retrieve document in path ${docRef.path} with ID ${id}`);
    }
  }

  async upsert(id: string, model: T, documentRef:DocumentReference = null):Promise<FirestoreDocument<T>>{
    const docRef = this.getDocumentReference(documentRef,id);
    try{
      const getModelResponse = await docRef.get();
			if (!getModelResponse.exists) {
				return this.create(model,documentRef);
			} else {
        return this.update(id, model, documentRef)
      }
    } catch(error){
      this.handleError(error, `Failed to retrieve document in path ${docRef.path} with ID ${id}`);
    }
  }

  private getDocumentReference = (documentRef:DocumentReference, id:string = null): DocumentReference<T> => {
    const collection = documentRef ? documentRef.collection(this.collection.path) as CollectionReference<T> : this.collection;
    return id ? collection.doc(id) : this.collection.doc();
  }

  private getFirestoreSnapshot = (filters: FirestoreFilter[]): Promise<FirebaseFirestore.QuerySnapshot<T>> => {
    if(!filters){
      return this.collection.get();
    }
    let query: Query<T> = null;
    filters.forEach((f) => {
      if(!query){
        query = this.collection.where(f.fieldPath, f.opStr, f.value);
      } else {
        query = query.where(f.fieldPath, f.opStr, f.value);
      } 
    });
    return query.get();
  }

  private createFirestoreDocument = (snapshot: FirebaseFirestore.DocumentSnapshot<T>) => {
    const documentData = snapshot.data();
		const documentId = snapshot.id;
		return {ref: snapshot.ref, id: documentId, data:documentData };
  }

  private handleError = (error : any, message: string) => {
    if(error.status){
      throw error;
    }
    throw new InternalServerErrorException(message)
  }
}