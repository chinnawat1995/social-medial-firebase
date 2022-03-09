import { collection, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from './Init';
import { User } from './types/User';

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const userCollection = createCollection<User>('users');
