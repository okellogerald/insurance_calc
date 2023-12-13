import APIError from "@/models/error";
import { CalculatorState, useCalculatorState } from "./models/calculator_state";
import PlansRepository from "../plans/repository";
import { Plan } from "../plans/models/plan";

export class CalculatorManager {
    private static _instance: CalculatorManager;

    plans: Plan[] | null

    private constructor() {
        this.plans = null
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    setState(state: CalculatorState): void {
        useCalculatorState.setState(state, true)
    }

    async getPlans(): Promise<void> {
        console.log("plans ", this.plans ?? 'hello ')
        if (this.plans !== null) {
            this.setState(({ kind: "success", plans: this.plans }))
        }

        this.setState(({ kind: "loading", loading: true }))

        const repo = new PlansRepository()
        try {
            const plans = await repo.getPlans()
            this.setState(({ kind: "success", plans: plans }))
        } catch (error) {
            const err = APIError.from(error)
            this.setState(({ kind: "error", error: err }))
        }
    }
}
