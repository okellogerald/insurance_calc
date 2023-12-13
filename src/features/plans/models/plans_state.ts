import APIError from "@/models/error";
import { create } from "zustand";
import { Plan } from "./plan";

export type PlansState = LoadingState | ErrorState | SuccessState;

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
    plans: Plan[];
}

export const usePlansState = create<PlansState>(() => ({ kind: "loading", loading: false }))