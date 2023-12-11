import User from "@/models/user"
import { create } from "zustand"
import AuthRepository from "../repository"
import { BaseState, setError, setLoading, setSuccess } from "@/state/base_state"
import APIError from "@/models/error"

export interface SignUpState extends BaseState<User> {
    signUp: (email: string, password: string) => Promise<void>,
}

export const useSignUpStore = create<SignUpState>()((set) => ({
    loading: false,
    error: undefined,
    user: undefined,

    signUp: async (email, password) => {
        try {
            set(setLoading)
            const user = await AuthRepository.signUp(email, password)
            set((s) => setSuccess<User>(s, user))
        } catch (error) {
            set((s) => setError(s, APIError.from(error)))
        }
    }
}))

