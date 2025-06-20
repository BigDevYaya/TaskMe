import { create } from "zustand";

const useMessageStore = create((set) => ({
    message : 'DashBoard',
    setMessage: (newMessage) => set({message: newMessage}),
}))

export default useMessageStore;