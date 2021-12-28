import { TodoDocument } from '../todos/documents/todo.document';
import { COLLECTIONS } from './firestore.collections'

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [COLLECTIONS.TODOS];