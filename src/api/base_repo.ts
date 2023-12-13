import axios, { AxiosHeaderValue, AxiosHeaders, AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

const root = 'http://127.0.0.1:3000';


export default class BaseRepository {
    rootUrl: string

    constructor(rootUrl?: string) {
        this.rootUrl = rootUrl === undefined ? root : rootUrl
    }

    private get defaultConfigs(): AxiosRequestConfig {
        const config: AxiosRequestConfig = {}

        const accToken = localStorage.getItem("acc_token")
        if (accToken !== null) {
            const headers : RawAxiosRequestHeaders = {
            }
            headers.Authorization = `Authorization Bearer ${accToken}`
            config.headers = headers
        }
        return config
    }

    async get<T>(path: string): Promise<T> {
        const response = await axios.get<T>(`${this.rootUrl}/${path}`, this.defaultConfigs)
        return response.data
    }

    async post<T>(path: string, data: object): Promise<T> {
        const response = await axios.post<T>(`${this.rootUrl}/${path}`, data, this.defaultConfigs)
        return response.data
    }
}
