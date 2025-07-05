import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const logLoginActivity = async (uid) => {
  const logRef = collection(db, 'users', uid, 'activityLogs');
  await addDoc(logRef, {
    type: 'login',
    timestamp: serverTimestamp(),
    device: navigator.userAgent,
  });
};
