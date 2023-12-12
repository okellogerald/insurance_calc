import { LogInState } from "./login_state";
import { create } from "zustand"
import AuthRepository from "../repository";
import APIError from "@/models/error";
import { AuthManager } from "../auth_manager";

export const useLogInState = create<LogInState>()(() => ({
    loading: false,
    error: null,
    user: null,
}))



export class LogInManager {
    private static _instance: LogInManager;

    private constructor() {
        //
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    async logIn(email: string, password: string): Promise<void> {
        useLogInState.setState(({ user: null, loading: true, error: null }))

        const repo = new AuthRepository()
        try {
            const user = await repo.logIn(email, password)
            AuthManager.instance.logIn(user)
            useLogInState.setState(({ user: user, loading: false, error: null }))
        } catch (error) {
            const err = APIError.from(error)
            useLogInState.setState(({ user: null, loading: false, error: err }))
        }
    }
}
