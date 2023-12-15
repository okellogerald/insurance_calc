import { AuthManager, useUserStore } from "@/features/auth/auth_manager";
import { User } from "@/models/user";
import axios from "axios";
import { z } from "zod";

const root = 'http://127.0.0.1:3000';

let refreshTokenTrials = 0

axios.defaults.maxRedirects = 1;

axios.interceptors.request.use(config => {
    const accToken = useUserStore.getState()?.accessToken ?? null
    if (accToken) {
        config.headers.Authorization = `Bearer ${accToken}`;
    }
    return config;
});

axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401) {
            // only allow 5 trials
            if (refreshTokenTrials > 4) return Promise.reject(error);
            refreshTokenTrials++

            const newToken = await refreshToken();
            const current = useUserStore.getState()
            if (current === null) return Promise.reject(error);

            const newUser: User = new User(current?.id, current?.email, newToken, current?.refreshToken)
            AuthManager.instance.updateUser(newUser)
            console.log("updated access token")

            refreshTokenTrials = 0

            // Retry the original request
            return axios(error.config);
        }
        return Promise.reject(error);
    }
);

const refreshToken = async (): Promise<string> => {
    const refToken = useUserStore.getState()?.refreshToken ?? null
    if (refToken === null) return Promise.reject("Please make sure you're authorized")

    const data = { refresh_token: refToken }
    const res = await axios.post(`${root}/token/refresh`, data)

    const tokenSchema = z.object({ access_token: z.string() })

    try {
        const tokenData = tokenSchema.parse(res.data)
        return tokenData.access_token
    } catch (error) {
        console.log("Refresh Token Error: ", error)
        return Promise.reject("Server returned an invalid response. Please try logging in manually.")
    }
}

export default class BaseRepository {
    rootUrl: string

    constructor(rootUrl?: string) {
        this.rootUrl = rootUrl === undefined ? root : rootUrl
    }

    async get<T>(path: string): Promise<T> {
        const response = await axios.get<T>(`${this.rootUrl}/${path}`)
        return response.data
    }

    async post<T>(path: string, data: object): Promise<T> {
        const response = await axios.post<T>(`${this.rootUrl}/${path}`, data)
        return response.data
    }
}
