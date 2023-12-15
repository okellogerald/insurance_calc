import { match } from "ts-pattern"
import { useCalculatorState } from "./models/calculator_state"
import { CalculatorManager } from "./manager";
import { useEffect } from "react";
import { ErrorView } from "@/views/error_view";
import CalculationView from "./views/calculation_view/calculation_view";

export default function CalculatorPage() {
    const state = useCalculatorState()

    const getPlans = () => CalculatorManager.instance.getPlans()

    useEffect(() => { getPlans() }, [])

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
            plans.length > 0 && <CalculationView plans={plans} />
        }
        {
            error !== null &&
            <ErrorView error={error} refreshFn={getPlans}></ErrorView>
        }
    </>
}
