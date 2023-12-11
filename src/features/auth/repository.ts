import User from "@/models/user";
import axios from "axios";

const rootUrl = 'http://127.0.0.1:3000';

export default class AuthRepository {
    static async logIn(email: string, password: string): Promise<User> {
        const response = await axios.post<User>(`${rootUrl}/log_in`, {
            email: email,
            password: password,
        })
        return response.data
    }

    static async signUp(email: string, password: string): Promise<User> {
        const response = await axios.post<User>(`${rootUrl}/sign_up`, {
            email: email,
            password: password,
        })
        return response.data
    }
}