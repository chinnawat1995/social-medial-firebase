import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

import 'firebase/storage';

const firebaseConfig: Object = {
  apiKey: 'AIzaSyAka6juZUmc4_9GaL_q8JX2nSEQtOZ6X8A',
  authDomain: 'cloud-functions-5a326.firebaseapp.com',
  projectId: 'cloud-functions-5a326',
  storageBucket: 'cloud-functions-5a326.appspot.com',
  messagingSenderId: '567538562149',
  appId: '1:567538562149:web:ed2bf4509b5320a9d7c28c',
};

initializeApp(firebaseConfig);

export const auth: Auth = getAuth();
export const firestore: Firestore = getFirestore();