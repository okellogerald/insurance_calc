import { atom, useAtom } from "jotai";
import User from "@/models/user"

const userAtom = atom<User | null>(null)

export default class AuthManager {

    init() {
        const { user, setUser } = useAtom(userAtom)
        try {
            const json = localStorage.getItem("user")
            if (json === null) return
            const user: User = JSON.parse(json)
            setUser(user)
        } catch (_) {
            setUser(null)
        }
    }
}