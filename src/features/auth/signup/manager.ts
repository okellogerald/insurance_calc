import { create } from "zustand"
import AuthRepository from "../repository";
import APIError from "@/models/error";
import { User } from "../models/user";

type SignUpState = LoadingState | ErrorState | SuccessState;

interface LoadingState {
    kind: "loading";
    loading: boolean;
}
interface ErrorState {
    kind: "error";
    error: APIError;
}
interface SuccessState {
    kind: "success";
    user: User;
}


export const useSignUpState = create<SignUpState>(() => ({ kind: "loading", loading: false }))

export class SignUpManager {
    private static _instance: SignUpManager;

    private constructor() {
        //
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    setState(state: SignUpState) {
        useSignUpState.setState(state, true)
    }

    async signUp(email: string, password: string): Promise<void> {
        this.setState(({ kind: "loading", loading: true }))

        const repo = new AuthRepository()
        try {
            const user = await repo.signUp(email, password)
            this.setState(({ kind: "success", user: user }))
        } catch (error) {
            const err = APIError.from(error)
            this.setState(({ kind: "error", error: err }))
        }
    }
}
