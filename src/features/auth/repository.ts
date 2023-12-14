import BaseRepository from "@/api/base_repo";
import { User } from "../../models/user";

export default class AuthRepository extends BaseRepository {
    async logIn(email: string, password: string): Promise<User> {
        type user = { id: number, email: string, access_token: string, refresh_token: string }
        const result = await this.post<user>("log_in", {
            email: email,
            password: password,
        })
        return User.fromJson(result)
    }

    async signUp(email: string, password: string): Promise<boolean> {
        await this.post<{ id: number, email: string }>("sign_up", {
            email: email,
            password: password,
        })
        return true
    }
}
