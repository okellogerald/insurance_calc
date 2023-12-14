import AuthRepository from "../repository";
import APIError from "@/models/error";
import { AuthManager } from "../auth_manager";
import { LogInState, useLogInState } from "./login_state";

export class LogInManager {
    private static _instance: LogInManager;

    private constructor() {
        //
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    setState(state: LogInState): void {
        useLogInState.setState(state, true)
    }

    async logIn(email: string, password: string): Promise<void> {
        this.setState(({ kind: "loading", loading: true }))

        const repo = new AuthRepository()
        try {
            const user = await repo.logIn(email, password)
            AuthManager.instance.logIn(user)
            this.setState(({ kind: "success", user: user }))
        } catch (error) {
            console.log(error)
            const err = APIError.from(error)
            this.setState(({ kind: "error", error: err }))
        }
    }
}
