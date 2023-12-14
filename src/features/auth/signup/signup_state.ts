import APIError from "@/models/error";
import { create } from "zustand";

export type SignUpState = LoadingState | ErrorState | SuccessState;

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
}

export const useSignUpState = create<SignUpState>(() => ({ kind: "loading", loading: false }))