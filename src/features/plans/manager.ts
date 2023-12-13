import APIError from "@/models/error";
import { PlansState, usePlansState } from "./models/plans_state";
import PlansRepository from "./repository";

export class PlansManager {
    private static _instance: PlansManager;

    private constructor() {
        //
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    setState(state: PlansState): void {
        usePlansState.setState(state, true)
    }

    async getPlans(): Promise<void> {
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
