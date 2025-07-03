import { addDoc, arrayUnion, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase"

export const uploadTaskFunction = async (task, uid) => {
    try{
        const taskRef = await addDoc(collection(db, 'tasks'), {
            ...task,
            uploadedBy : uid,
            status : 'pending',
            createdAt : serverTimestamp()
        })

        const taskId = taskRef.id
        const userRef = doc(db, 'users', uid)
        await updateDoc(userRef, {
            uploadedTasks: arrayUnion(taskId)
        })

        console.log('Task Has Been uploaded with ID: ', taskRef.id)
        console.log(taskId)
        return taskRef.id
    } catch(err){
        console.log('Upload Failed: ', err)
        throw err
    }
}