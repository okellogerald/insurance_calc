import { Button } from "@/components/ui/button"
import { NavigateHookWrapper } from "@/hooks/helpers/helpers"
import APIError from "@/models/error"
import { Home, RefreshCcw } from "lucide-react"
import React, { ReactNode } from "react"
import { NavigateFunction } from "react-router"

export class ErrorView extends React.Component<{ error: APIError, refreshFn: () => void }> {
    render(): ReactNode {
        return <NavigateHookWrapper renderFn={(nv: NavigateFunction): ReactNode => {
            return <div className="h-screen w-screen flex flex-col justify-center">
                <div className="h-64 flex flex-col place-content-center bg-red-50">
                    <h3 className="text-red-800 text-center text-2xl">An error happened</h3>
                    <p className="text-size-4 mb-2 text-center text-gray-600">{this.props.error.message}</p>
                    <div className="flex justify-center gap-3">
                        <Button onClick={this.props.refreshFn}>
                            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                        </Button>
                        <Button onClick={() => nv("/")}>
                            <Home className="mr-2 h-4 w-4" /> Go Home
                        </Button>
                    </div>
                </div>
            </div>
        }} />
    }
}
