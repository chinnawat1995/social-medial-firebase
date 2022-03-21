import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './Init';

export const uploadFile = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    const storageResponse = await uploadBytes(storageRef, file);

    return getDownloadURL(storageResponse.ref);
  } catch (error: any) {
    return error.message;
  }
};
