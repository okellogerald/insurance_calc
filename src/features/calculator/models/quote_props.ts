import { Plan } from "@/features/plans/models/plan";
import { Nullable } from "@/lib/types";
import { create } from "zustand";

export const useQuotePropsState = create<QuoteProps>(() => ({
    plan: null,
    name: null,
    age: null,
    term: null,
    sumAssured: null
}))


export interface QuoteProps {
    plan: Nullable<Plan>
    name: string | null
    age: Date | null
    term: Term | null
    sumAssured: SumAssured | null
}

export class SumAssured {
    id: number;
    value: number;

    constructor(id: number, valueInMillions: number) {
        this.id = id
        this.value = valueInMillions
    }

    get fullAmount(): number {
        return this.value * 1000000
    }

    get label(): string {
        return "TZS " + this.fullAmount.toLocaleString()
    }
}

export class Term {
    id: number;
    value: number;

    constructor(id: number, valueInYrs: number) {
        this.id = id
        this.value = valueInYrs
    }

    get label(): string {
        return this.value.toString() + " Years"
    }
}


const sumAssureds = [
    new SumAssured(1, 5.0),
    new SumAssured(2, 7.5),
    new SumAssured(3, 10.0),
    new SumAssured(4, 12.5),
    new SumAssured(5, 15.0),
    new SumAssured(6, 17.5),
    new SumAssured(7, 20.0),
]

const terms = [
    new Term(1, 10),
    new Term(1, 12),
    new Term(1, 15),
]
