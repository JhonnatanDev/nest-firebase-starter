import { FieldPath, WhereFilterOp } from '@google-cloud/firestore';
import { Filter } from '../types/Query.types'

export const mapFilterToFirestoreFilter = (filter: Filter) => { 
  return {
    fieldPath: Array.isArray(filter.fieldPath) ? new FieldPath(...filter.fieldPath) : filter.fieldPath,
    opStr: filter.opStr as WhereFilterOp,
    value: filter.value
  } ;
}