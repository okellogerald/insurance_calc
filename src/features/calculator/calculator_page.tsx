import { match } from "ts-pattern"
import { useCalculatorState } from "./models/calculator_state"
import { CalculatorManager } from "./manager";
import { useEffect } from "react";

export default function CalculatorPage() {
    const state = useCalculatorState()

    useEffect(() => {
        CalculatorManager.instance.getPlans()
    }, [])

    const plans = match(state)
        .with({ kind: "success" }, ({ plans }) => plans)
        .otherwise(() => [])

    const loading = match(state)
        .with({ kind: "loading" }, ({ loading }) => loading)
        .otherwise(() => false)

    const error = match(state)
        .with({ kind: "error" }, ({ error }) => error)
        .otherwise(() => null)

    return <>
        {
            loading &&
            <>
                <div className="w-full h-full text-center">
                    <p>Loading</p>
                </div>
            </>
        }
        {
            plans.length >= 0 &&
            <>
                {plans.map(p => <div>{p.name}</div>)}
            </>
        }
        {
            error !== null &&
            <>
                <div>
                    <p>An error happened</p>
                    <p>{error.message}</p>
                </div>
            </>
        }
    </>
}