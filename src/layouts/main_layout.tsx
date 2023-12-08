import { Component, ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
  }

export default class MainLayout extends Component<MainLayoutProps> {
    render() {
        return (
            <main className="flex flex-col items-center justify-center h-screen p-5 max-w-md prose">
                    {this.props.children}
            </main>
        )
    }
}