import AuthRepository from "../repository";
import APIError from "@/models/error";
import { SignUpState, useSignUpState } from "./signup_state";


export class SignUpManager {
    private static _instance: SignUpManager;

    private constructor() {
        //
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private setState(state: SignUpState): void {
        useSignUpState.setState(state, true)
    }

    async signUp(email: string, password: string): Promise<void> {
        this.setState(({ kind: "loading", loading: true }))

        const repo = new AuthRepository()
        try {
            const success = await repo.signUp(email, password)
            if(!success) throw "Sign up was not successful. Please try again later"
            this.setState(({ kind: "success" }))
        } catch (error) {
            const err = APIError.from(error)
            this.setState(({ kind: "error", error: err }))
        }
    }
}
