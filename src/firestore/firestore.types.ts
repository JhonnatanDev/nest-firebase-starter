import { DocumentReference, FieldPath, WhereFilterOp } from '@google-cloud/firestore';

export type FirestoreDocument<T> = {
  ref:DocumentReference<T>,
  id: string,
  data: T
}

export type FirestoreFilter = {
  fieldPath: string | FieldPath,
  opStr: WhereFilterOp,
  value: any
}