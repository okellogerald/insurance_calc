
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form } from "@/components/ui/form"
import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plan } from "@/features/plans/models/plan"
import NameField from "./name_field"
import DOBField from "./dob_view"
import PlanField from "./plan_field"
import SumAssuredPicker from "./sum_assured_picker"
import TermField from "./term_field"
import { create } from "zustand"
import SumAssuredField from "./sum_assured_field"

interface CalcState {
    plan: Plan | null
    term: number | null,
    sumAssured: number | null,
    terms: number[]
    sumAssureds: number[],

    termsDisabled: () => boolean,
    sumAssurredDisabled: () => boolean,
}

const useCalcState = create<CalcState>()((_, get) => ({
    plan: null,
    term: null,
    sumAssured: null,
    terms: [],
    sumAssureds: [],

    termsDisabled: () => get().plan == null,
    sumAssurredDisabled: () => get().plan == null,
}))

export const CalcForm: React.FC<{ plans: Plan[] }> = ({ plans }) => {
    const calcState = useCalcState()
    const showSAField = calcState.sumAssureds.length === 0


    // 1. Define your schema
    const formSchema = z.object({
        name: z.string(),
        dob: z.date(),
        plan: z.string(),
        sum_assured: z.number(),
        term: z.number(),
    })

    // 2. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    useEffect(() => { form.reset() }, [form]);

    // 3. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.name)
    }

    function selectPlan(p: Plan) {
        useCalcState.setState({ plan: p })
        form.setValue("plan", p.name)

        handlePlanChanges(p)
    }

    function handleSumAssuredChanges(s: number) {
        const p = calcState.plan
        if (p == null) return

        if (p.sumAssuredDependentTerms !== null) {
            const item = p.sumAssuredDependentTerms.find((e) => e.sumAssured == s)
            if (item === undefined) return

            // set term
            const terms = item.terms.map((e) => e)
            useCalcState.setState({ terms: terms })

            // check if current term is elligible
            const next = terms[0]
            const current = calcState.term
            if (current !== next) selectTerm(next)
        }
    }

    function handlePlanChanges(p: Plan) {
        if (p.availableTerms !== null) {
            const terms = p.availableTerms.map((e) => e)
            useCalcState.setState({ terms: terms })
            selectTerm(p.availableTerms[0])

            const s = 40000000
            form.setValue("sum_assured", s)
            useCalcState.setState({ sumAssured: s })
            useCalcState.setState({ sumAssureds: [] })
        }

        if (p.sumAssuredDependentTerms !== null) {
            // set sum assureds
            const sumAssureds = p.sumAssuredDependentTerms.map((e) => e.sumAssured)
            useCalcState.setState({ sumAssureds: sumAssureds })

            const item = p.sumAssuredDependentTerms[0]
            selectSumAssured(item.sumAssured)

            // set term
            useCalcState.setState({ terms: item.terms })
            selectTerm(item.terms[0])
        }
    }

    function selectSumAssured(s: number) {
        form.setValue("sum_assured", s)
        useCalcState.setState({ sumAssured: s })
        handleSumAssuredChanges(s)
    }

    function selectTerm(t: number) {
        form.setValue("term", t)
        useCalcState.setState({ term: t })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <NameField control={form.control}></NameField>
            <DOBField control={form.control}></DOBField>
            <PlanField control={form.control} plans={plans} onSelect={selectPlan}></PlanField>
            {
                showSAField ?
                    <SumAssuredField
                        control={form.control}
                        disabled={calcState?.sumAssurredDisabled()}
                    ></SumAssuredField>
                    :
                    <SumAssuredPicker
                        control={form.control}
                        sumAssureds={calcState?.sumAssureds}
                        disabled={calcState?.sumAssurredDisabled()}
                        onSelect={selectSumAssured}
                    ></SumAssuredPicker>
            }
            <TermField
                control={form.control}
                terms={calcState?.terms}
                onSelect={selectTerm}
                disabled={calcState?.termsDisabled()}
            ></TermField>
            <Button className="w-full">Submit</Button>
        </form>
    </Form>
}

