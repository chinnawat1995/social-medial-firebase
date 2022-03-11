import { auth } from './Init';
import {
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const signInWithEmail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error('Please check your email or password.');
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (error) {
    return error;
  }
};

export const signInWithGoogle = async () => {
  const provider: GoogleAuthProvider = new GoogleAuthProvider();

  try {
    const result: UserCredential = await signInWithPopup(auth, provider);
    GoogleAuthProvider.credentialFromResult(result);
  } catch (error) {
    return error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error;
  }
};
