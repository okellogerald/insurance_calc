export interface Plan {
    id: number,
    name: string,
    availableTerms: number[] | null,
    sumAssuredDependentTerms: SumAssuredDependentTerm[] | null,
}

export interface SumAssuredDependentTerm {
    sumAssured: number
    terms: number[]
}