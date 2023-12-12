import User from "@/models/user"
import { create } from "zustand"
import AuthRepository from "../repository"
import { BaseState } from "@/state/base_state"
import APIError from "@/models/error"

export interface LogInManager extends BaseState {
    user: User | null,

    logIn: (email: string, password: string) => Promise<void>,
}

export const useLogInStore = create<LogInManager>()((set) => ({
    loading: false,
    error: null,
    user: null,

    setLoading: () => {
        set(() => ({ loading: true, error: null }))
    },

    setError: (err: APIError) => {
        set(() => ({ loading: false, error: err }))
    },

    setData: (user: User) => {
        set(() => ({ loading: false, error: null, user: user }))
    },

    logIn: async (email, password) => {
        try {
           
            const user = await AuthRepository.logIn(email, password)
            localStorage.setItem("user", JSON.stringify(user))
            set(() => ({ loading: false, error: null }))
        } catch (error) {
            set((s) => setError(s, APIError.from(error)))
        }
    }
}))

