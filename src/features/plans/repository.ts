import BaseRepository from "@/api/base_repo";
import { Plan, SumAssuredDependentTerm } from "./models/plan";
import { z } from "zod";


const planSchema = z.object({
    id: z.number(),
    name: z.string(),
    available_terms: z.array(z.number()).default([]),
    sum_assured_dependent_terms: z.array(
        z.object({ sum_assured: z.number(), terms: z.array(z.number()) })
    )
        .default([]),
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

            const terms: SumAssuredDependentTerm[] = []
            if (item.sum_assured_dependent_terms.length !== 0) {
                for (let j = 0; j < item.sum_assured_dependent_terms.length; j++) {
                    const e = item.sum_assured_dependent_terms[j];
                    terms.push({ terms: e.terms, sumAssured: e.sum_assured })
                }
            }

            const plan: Plan = {
                id: item.id,
                name: item.name,
                availableTerms: item.available_terms.length === 0 ? null : item.available_terms,
                sumAssuredDependentTerms: item.sum_assured_dependent_terms.length === 0 ? null : terms
            }
            plans.push(plan)
        }
        
        return plans
    }
}