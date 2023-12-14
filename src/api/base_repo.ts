import { useUserStore } from "@/features/auth/auth_manager";
import { User } from "@/models/user";
import axios from "axios";

const root = 'http://127.0.0.1:3000';


export default class BaseRepository {
    rootUrl: string

    constructor(rootUrl?: string) {
        this.rootUrl = rootUrl === undefined ? root : rootUrl
    }

    private getLocalUser(): User | null {
        return useUserStore.getState()
    }

    private updateConfigs(): void {
        const accToken = this.getLocalUser()?.accessToken ?? null
        console.log("access token ", accToken)
        if (accToken !== null) {
            axios.defaults.headers.common.Authorization = `Bearer ${accToken}`
        }
    }

    async get<T>(path: string): Promise<T> {
        this.updateConfigs()
        const response = await axios.get<T>(`${this.rootUrl}/${path}`)
        return response.data
    }

    async post<T>(path: string, data: object): Promise<T> {
        this.updateConfigs()
        const response = await axios.post<T>(`${this.rootUrl}/${path}`, data)
        return response.data
    }
}
