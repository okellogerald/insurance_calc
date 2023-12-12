import APIError from "@/models/error";

export interface BaseState {
    loading: boolean;
    error: APIError | null;
}
