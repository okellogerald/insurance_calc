import BaseRepository from "@/api/base_repo";
import User from "@/models/user";

interface LogInInfo extends User {
    accessToken: string,
    refreshToken: string,
}

export default class AuthRepository extends BaseRepository {
    async logIn(email: string, password: string): Promise<LogInInfo> {
        return await this.post<LogInInfo>("log_in", {
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