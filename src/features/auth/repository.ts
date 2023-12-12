import BaseRepository from "@/api/base_repo";
import { User } from "./models/user";

export default class AuthRepository extends BaseRepository {
    async logIn(email: string, password: string): Promise<User> {
        return await this.post<User>("log_in", {
            email: email,
            password: password,
        })
    }

    async signUp(email: string, password: string): Promise<User> {
        return await this.post<User>("sign_up", {
            email: email,
            password: password,
        })
    }
}