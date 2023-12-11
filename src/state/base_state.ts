import APIError from "@/models/error";

export interface BaseState<T> {
    loading: boolean;
    error?: APIError;
    data?: T;
}

export function setLoading<T>(state: BaseState<T>): BaseState<T> {
    return {
        loading: true,
        error: state.error,
        data: state.data,
    }
}

export function setSuccess<T>(state: BaseState<T>, data: T): BaseState<T> {
    return {
        loading: false,
        error: state.error,
        data: data,
    }
}

export function setError<T>(state: BaseState<T>, error: APIError): BaseState<T> {
    return {
        loading: false,
        error: error,
        data: state.data,
    }
}