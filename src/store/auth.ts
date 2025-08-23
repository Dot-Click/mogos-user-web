import {create} from "zustand";

interface User {
    email: string;
    fullName: string;
    isPhoneVerified: boolean;
    phoneNumber: string;
    role: string;
    id: string;
}


interface AuthStore {
    user: User | null;
    setUser: (user: User) => void;
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
}


export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    token: null,
    setToken: (token: string) => set({ token }),
    logout: () => set({ user: null, token: null }),
}));