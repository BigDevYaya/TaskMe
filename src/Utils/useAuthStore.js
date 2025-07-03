import { create } from "zustand";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile
 } from "firebase/auth";
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore'
import { auth, db } from "./firebase";

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,

    initAuth: () => {
        onAuthStateChanged(auth, (user) => {
            set({
                user: user || null, isLoading : false
            });
        })
    },

    register : async (uname, email, password) => {
        set({isLoading : true})
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user


            // Update Auth profile display name with name
            await updateProfile(user, {
                displayName : uname
            })

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                uname,
                email,
                createdAt: new Date(),
                lastLogin: new Date(),                
                uploadedTasks: [],          
                completedTasks: [],
                totalEarnings : 0                               
                });
            
            const userDoc = await getDoc(doc(db, "users", user.uid));
            let userData = {};
            if(userDoc.exists()) {
                userData = userDoc.data();
            }

            set({user:{...user, ...userData}, isLoading : false});

            return {
                success : true, 
                user: {...user, ...userData}} 
            } catch(error){
                set({isLoading : false})
                return{
                    success: false,
                    error: error.message
                }
            }
        },
    
    login : async (email, password) => {
        set({ isLoading : true })
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            const user = res.user

            const userDoc = await getDoc(doc(db, "users", user.uid));
            let userData = {};
            if(userDoc.exists()) {
                userData = userDoc.data();
            }
            set({
                user : {
                    ...user,
                    ...userData
                },
                isLoading : false
            })

            return {
                success : true,
                user : {
                    ...user,
                    ...userData
                }
            }
        } catch(error){
            return {
                success : false,
                error: error.message
            }
        } finally{
            set({isLoading : false})
        }
    },

    logout : async () => {
        try {
            await signOut(auth),
            set({
                user : null
            })
        } catch (error) {
            console.error("Logout error : ", error.message )
        }
    } 
}))