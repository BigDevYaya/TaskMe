import { create } from "zustand";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    deleteUser
 } from "firebase/auth";
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore'
import { auth, db } from "./firebase";
import { logLoginActivity } from "./logLoginActivity";

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({ user }),

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
    
    login: async (email, password) => {
        set({ isLoading: true });

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;

            await logLoginActivity(user.uid)

            // 🗃️ Fetch user profile data
            const userDoc = await getDoc(doc(db, "users", user.uid));
            let userData = {};
            if (userDoc.exists()) {
            userData = userDoc.data();
            }

            const mergedUser = {
            ...user,
            ...userData
            };

            set({
            user: mergedUser,
            isLoading: false
            });

            return {
            success: true,
            user: mergedUser
            };
        } catch (error) {
            return {
            success: false,
            error: error.message
            };
        } finally {
            set({ isLoading: false });
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
    },

    changePassword : async (currentPassword, newPassword) => {
        set({ isLoading: true });
        const user = auth.currentUser;  
        if (!user) {
            return { success: false, error: "No user is currently logged in." };
        }
        try {
            // Reauthenticate the user
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential)


            // Update the password
            await updatePassword(user, newPassword);
            return { success: true, message: "Password changed successfully." };
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            set({ isLoading: false });
        }
    },

    changeEmail : async (currentemail, newEmail, password) => {
        set({ isLoading: true });
        const user = auth.currentUser;

        if(!user) {
            return { success: false, error: "No user is currently logged in." };
        }

        try{
            const credentail = EmailAuthProvider.credential(currentemail, password);
            await reauthenticateWithCredential(user, credentail);

            await updateProfile(user, {
                email: newEmail
            });

            return {
                success: true, 
                message: "Email changed successfully."
            }
        } catch(error){
            return {
                success: false,
                message: error.message
            }
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAccount: async (password) => {
        set({isLoading : true});
        const user = auth.currentUser;

        if (!user) {
            return { success: false, error: "No user is currently logged in." };
        }

        try{
            const credential = EmailAuthProvider.credential(user.email, password)
            await reauthenticateWithCredential(user, credential)

            await deleteUser(user);
            
            set({
                user: null
            })
            return {
                success : true,
                message: "Account deleted successfully."
            }
        } catch(error){
            return {
                success: false,
                message: error.message
            }
        } finally {
            set({ 
                isLoading: false 
            });

        }
    }
}))