import { Component, ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}

export default class AuthLayout extends Component<AuthLayoutProps> {
    render(): ReactNode {
        return (
            <>
             <div className="h-screen w-screen">
                    <div className="bg-gray-100 flex h-full w-full items-center py-16">
                        <div className="w-full max-w-md mx-auto p-6">
                            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:border-gray-700">
                                <div className="p-4 sm:p-7">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}