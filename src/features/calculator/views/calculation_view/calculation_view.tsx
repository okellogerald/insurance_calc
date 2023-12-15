"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Control, UseFormReturn, useForm } from "react-hook-form"
import * as z from "zod"

import { Form } from "@/components/ui/form"
import { useNavigate } from "react-router"
import { useToast } from "@/components/ui/use-toast"
import APIError from "@/models/error"
import React from "react"
import AuthLayout from "@/layouts/auth_layout"
import { Button } from "@/components/ui/button"
import { Plan } from "@/features/plans/models/plan"
import { SumAssured, Term } from "../../models/quote_props"
import NameField from "./name_field"
import DOBField from "./dob_view"
import PlanField from "./plan_field"
import SumAssuredField from "./sum_assured_field"
import TermField from "./term_field"
import QuoteDisclaimer from "./disclaimer"

export type CalcFormControl = Control<{
    name: string;
    dob: Date;
    plan: string;
    sum_assured: number;
    term: number;
}, unknown>

export default class CalculationView extends React.Component<{ plans: Plan[] }> {
    render(): React.ReactNode {
        return <AuthLayout>
            <h3 className="text-center mt-4">GET A QUOTE</h3>
            <CalcForm plans={this.props.plans} />
            <QuoteDisclaimer></QuoteDisclaimer>
        </AuthLayout>
    }
}

const CalcForm: React.FC<{ plans: Plan[] }> = ({ plans }) => {
    const sumAssureds: SumAssured[] = []
    const terms: Term[] = []

    // hooks
    const { toast } = useToast()
    const navigate = useNavigate()

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

    // 3. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const onError = (error: APIError) => {
            toast({
                variant: "destructive",
                title: `Request failed with status code ${error.statusCode}`,
                description: error.message,
            })
        }

        const onSuccess = () => {
            toast({
                title: `Registration was successful`,
                description: 'Please log in to your account',
            })
            navigate("/login")
        }
    }

    function selectPlan(p: Plan) {
        form.setValue("plan", p.name)

        if (p.availableTerms !== null) {
            // work on this
        }

        if (p.sumAssuredDependentTerms !== null) {
            // set sum assureds
            const item = p.sumAssuredDependentTerms[0]
            const number = item.sumAssured
            const sa = new SumAssured(number, number)
            selectSumAssured(sa)

            const term = new Term(number, item.terms[0])
            selectTerm(term)
        }
    }

    function selectSumAssured(s: SumAssured) {
        form.setValue("sum_assured", s.value)
    }

    function selectTerm(t: Term) {
        form.setValue("term", t.value)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <NameField control={form.control}></NameField>
            <DOBField control={form.control}></DOBField>
            <PlanField control={form.control} plans={plans} onSelect={selectPlan}></PlanField>
            <SumAssuredField control={form.control} sumAssureds={sumAssureds} onSelect={selectSumAssured}></SumAssuredField>
            <TermField control={form.control} terms={terms} onSelect={selectTerm}></TermField>
            <Button className="w-full">Submit</Button>
        </form>
    </Form>
}

