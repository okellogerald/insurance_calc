import { Plan } from "@/features/plans/models/plan";
import APIError from "@/models/error";
import { create } from "zustand";

export type CalculatorState = LoadingState | ErrorState | SuccessState;

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

export const useCalculatorState = create<CalculatorState>(() => ({ kind: "loading", loading: false }))