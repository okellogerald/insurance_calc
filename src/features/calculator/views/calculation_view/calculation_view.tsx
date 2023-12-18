"use client"

import { Control } from "react-hook-form"

import React from "react"
import AuthLayout from "@/layouts/auth_layout"
import { Plan } from "@/features/plans/models/plan"
import QuoteDisclaimer from "./disclaimer"
import { CalcForm } from "./calc_form"

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
