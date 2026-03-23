import { addDoc, arrayUnion, collection, serverTimestamp, setDoc, doc } from "firebase/firestore"
import { db } from "../Utils/firebase.js" // Make sure this path is correct for your setup

export const uploadTaskFunction = async (task, uid, email) => {
    try {
        const taskRef = await addDoc(collection(db, 'tasks'), {
            ...task,
            uploadedBy: uid,
            uploaderEmail: email,
            completedBy: [],
            unapprovedApplicants: [],
            status: 'pending',
            createdAt: serverTimestamp()
        })

        const taskId = taskRef.id
        const userRef = doc(db, 'users', uid)
        
        // Changed from updateDoc to setDoc with merge: true
        await setDoc(userRef, {
            uploadedTasks: arrayUnion(taskId)
        }, { merge: true })

        console.log('Task Has Been uploaded with ID: ', taskId)
        return taskId
    } catch(err) {
        console.error('Upload Failed: ', err)
        throw err
    } 
}