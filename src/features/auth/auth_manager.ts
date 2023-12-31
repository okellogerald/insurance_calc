import { create } from "zustand"
import { User } from "./models/user";

export const useUserStore = create<User | null>()(() => (null))

export class AuthManager {
    private static _instance: AuthManager;

    private constructor() {
        //...
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    /**
     * Returns true if user exists in local storage
     */
    checkUserInStorage(): boolean {
        try {
            const json = localStorage.getItem("user")
            if (json === null) return false

            const user: User = JSON.parse(json)
            console.log("user ", user)
            useUserStore.setState(user)
            return true
        } catch (_) {
            useUserStore.setState(null)
            return false
        }
    }

    logIn(user: User) {
        localStorage.setItem("user", JSON.stringify(user))
        useUserStore.setState(user)
    }

    logOut() {
        useUserStore.setState(null)
        localStorage.removeItem("user")
    }
}
