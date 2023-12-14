import BaseRepository from "@/api/base_repo";
import { Plan, SumAssuredDependentTerm } from "./models/plan";
import { z } from "zod";


const planSchema = z.object({
    id: z.number(),
    name: z.string(),
    available_terms: z.array(z.number()).nullable(),
    sum_assured_dependent_terms: z.array(
        z.object({ sum_assured: z.number(), terms: z.array(z.number()) })
    )
        .nullable(),
});
const plansSchema = z.array(planSchema)

export default class PlansRepository extends BaseRepository {
    constructor() { super("http://127.0.0.1:3300") }

    async getPlans(): Promise<Plan[]> {
        const results = await this.get<unknown[]>("api")
        const result = plansSchema.parse(results)

        const plans: Plan[] = []
        for (let i = 0; i < result.length; i++) {
            const item = result[i]
            const sadt = item.sum_assured_dependent_terms ?? []
            const at = item.available_terms ?? []

            const terms: SumAssuredDependentTerm[] = []
            if (sadt.length !== 0) {
                for (let j = 0; j < sadt.length; j++) {
                    const e = sadt[j];
                    terms.push({ terms: e.terms, sumAssured: e.sum_assured })
                }
            }

            const plan: Plan = {
                id: item.id,
                name: item.name,
                availableTerms: at.length === 0 ? null : at,
                sumAssuredDependentTerms: sadt.length === 0 ? null : terms
            }
            plans.push(plan)
        }

        return plans
    }
}