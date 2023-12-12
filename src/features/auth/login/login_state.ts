import { User } from "../models/user";
import APIError from "@/models/error";
import { create } from "zustand";

export type LogInState = LoadingState | ErrorState | SuccessState;

interface LoadingState {
    kind: "loading";
    loading: boolean;
}
interface ErrorState {
    kind: "error";
    error: APIError;
}
interface SuccessState {
    kind: "success";
    user: User;
}

export const useLogInState = create<LogInState>(() => ({ kind: "loading", loading: false }))