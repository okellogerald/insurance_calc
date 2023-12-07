import { Component, ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
  }

export default class MainLayout extends Component<MainLayoutProps> {
    render() {
        return (
            <main className="flex flex-col items-center justify-center h-screen p-5 prose">
                <div className="flex flex-col items-center gap-y-2" >
                    {this.props.children}
                </div>
            </main>
        )
    }
}