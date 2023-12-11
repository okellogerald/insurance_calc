import User from "@/models/user"
import { create } from "zustand"
import AuthRepository from "../repository"
import { BaseState, setError, setLoading, setSuccess } from "@/state/base_state"
import APIError from "@/models/error"

export interface LogInState extends BaseState<User> {
    logIn: (email: string, password: string) => Promise<void>,
}

export const useLogInStore = create<LogInState>()((set) => ({
    loading: false,
    error: undefined,
    user: undefined,

    logIn: async (email, password) => {
        try {
            set(setLoading)
            const user = await AuthRepository.logIn(email, password)
            localStorage.setItem("user", JSON.stringify(user))
            set((s) => setSuccess<User>(s, user))
        } catch (error) {
            set((s) => setError(s, APIError.from(error)))
        }
    }
}))

