import { Timestamp } from '@google-cloud/firestore';
export class TodoDocument {
  name: string;
  dueDate: Timestamp;
}