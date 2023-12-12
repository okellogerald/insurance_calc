import User from "@/models/user"
import { create } from "zustand"

export const useUserStore = create<User | null>()(() => (null))

export class AuthManager {
    private static _instance: AuthManager;

    private constructor() {
        //...
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    init() {
        try {
            const json = localStorage.getItem("user")
            if (json === null) return
            const user: User = JSON.parse(json)
            useUserStore.setState(user)
        } catch (_) {
            useUserStore.setState(null)
        }
    }

    logIn(user: User, accessToken: string, refreshToken: string) {
        localStorage.setItem("accToken", accessToken)
        localStorage.setItem("refToken", refreshToken)
        useUserStore.setState(user)
    }
}
