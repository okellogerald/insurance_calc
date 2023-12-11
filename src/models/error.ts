import { AxiosError } from "axios";

export default class APIError {
    message: string;
    statusCode: number;

    constructor(msg: string, sCode: number) {
        this.message = msg;
        this.statusCode = sCode;
    }

    static from(err: any): APIError {
        if (err instanceof AxiosError) {
            return {
                statusCode: err.response?.status ?? 500,
                message: err.response?.data["message"] ?? err.message
            }
        }

        return {
            message: "Unknown Error",
            statusCode: 500,
        }
    }
}