import axios from "axios";

const rootUrl = 'http://127.0.0.1:3000';

export default class BaseRepository {
    async get<T>(path: string): Promise<T> {
        const response = await axios.get<T>(`${rootUrl}/${path}`)
        return response.data
    }

    async post<T>(path: string, data: object): Promise<T> {
        const response = await axios.post<T>(`${rootUrl}/${path}`, data)
        return response.data
    }
}
