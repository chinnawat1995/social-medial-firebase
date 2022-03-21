import { collection, CollectionReference, DocumentData } from 'firebase/firestore';
import { firestore } from './Init';
import Love from './types/Love';
import Post from './types/Post';
import User from './types/User';

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const userCollection = createCollection<User>('users');
export const PostCollection = createCollection<Post>('posts');
export const LoverCollection = createCollection<Love>('loves');
