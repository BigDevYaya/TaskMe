import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { th } from 'date-fns/locale';

export const logLoginActivity = async (uid) => {
  try {
    if(!uid){
      throw new Error('User ID is required to log login activity'); 
    }
    const logRef = collection(db, 'users', uid, 'activityLogs');
    await addDoc(logRef, {
      type: 'login',
      timestamp: serverTimestamp(),
      device: navigator.userAgent,
    });
  } catch (error) {
    console.error('Error logging login activity:', error);
  }
};
