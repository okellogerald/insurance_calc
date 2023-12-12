import { redirect } from "react-router"
import { AuthManager } from "./auth_manager"

export const MustBeLoggedInMiddleware = async () => {
    const exists = AuthManager.instance.checkUserInStorage()
    if (exists) {
        return null
    }

    return redirect('/login')
}