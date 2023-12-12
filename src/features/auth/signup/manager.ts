import { SignUpState } from "./signup_state";
import { create } from "zustand"
import AuthRepository from "../repository";
import APIError from "@/models/error";

export const useSignUpState = create<SignUpState>()(() => ({
    loading: false,
    error: null,
    user: null,
}))


export class SignUpManager {
    private static _instance: SignUpManager;

    private constructor() {
        //
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    async signUp(email: string, password: string): Promise<void> {
        useSignUpState.setState(({ user: null, loading: true, error: null }))

        const repo = new AuthRepository()
        try {
            const user = await repo.signUp(email, password)
            useSignUpState.setState(({ user: user, loading: false, error: null }))
        } catch (error) {
            const err = APIError.from(error)
            useSignUpState.setState(({ user: null, loading: false, error: err }))
        }
    }
}
