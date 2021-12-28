import {
  Injectable,
} from '@nestjs/common';
import { CollectionReference, DocumentReference, FieldPath, Query, WhereFilterOp, UpdateData } from '@google-cloud/firestore';
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
    await docRef.set({id:docRef.id, ...params});
    const documentResponse = await docRef.get();
    const document = this.createFirestoreDocument(documentResponse);
    return document;
  }

  async findAll(filters: FirestoreFilter[]): Promise<FirestoreDocument<T>[]> {
    const snapshot = await this.getFirestoreSnapshot(filters);
    const data: FirestoreDocument<T>[] = [];
    snapshot.forEach(doc => {
      const document = this.createFirestoreDocument(doc);
      data.push(document)
    });
    return data;
  }

  async get(id: string, documentRef:DocumentReference = null): Promise<FirestoreDocument<T>> {
    const docRef = this.getDocumentReference(documentRef,id);
    const documentResponse = await docRef.get();
    if(!documentResponse.exists){
      throw new Error(`Document in path ${this.collection.path} with ID ${id} not found`)
    }
		const document = this.createFirestoreDocument(documentResponse);
    return document;
  }

  async update(id: string, model: T, documentRef:DocumentReference = null): Promise<FirestoreDocument<T>> {
    const docRef = this.getDocumentReference(documentRef, id);
    const documentResponse = await docRef.get();
    if(!documentResponse.exists){
      throw new Error(`Document in path ${this.collection.path} with ID ${id} not found`)
    }

    Object.keys(model).forEach(
			(key) => model[key] === undefined && delete model[key]
		);
    if (Object.keys(model).length === 0) {
      return null;
    }

    const updateModel = model as UpdateData<T>;
    await docRef.update(updateModel)
    const updatedModel = await this.get(id);
    return updatedModel;
  }

  async delete(id: string, documentRef:DocumentReference = null): Promise<string>{
    const docRef = this.getDocumentReference(documentRef,id);
    const getModelResponse = await docRef.get();
			if (!getModelResponse.exists) {
				throw new Error(`Document in path ${this.collection.path} with ID ${id} not found`)
			}
    await docRef.delete();
    return id;
  }

  async upsert(id: string, model: T, documentRef:DocumentReference = null):Promise<FirestoreDocument<T>>{
    const docRef = this.getDocumentReference(documentRef,id);
    const getModelResponse = await docRef.get();
			if (!getModelResponse.exists) {
				const newModel = await this.create(model,documentRef);
        return newModel;
			} else {
        const updatedModel = await this.update(id, model, documentRef)
        return updatedModel;
      }
  }

  private getDocumentReference = (documentRef:DocumentReference, id:string = null): DocumentReference<T> => {
    return documentRef ? documentRef.collection(this.collection.path).doc(id) as DocumentReference<T> : this.collection.doc(id);
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
		const document = {ref: snapshot.ref, id: documentId, data:documentData };
    return document;
  }
}