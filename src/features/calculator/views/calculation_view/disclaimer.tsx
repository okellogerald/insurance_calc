import React from "react";
import { ReactNode } from "react";

export default class QuoteDisclaimer extends React.Component {
    render(): ReactNode {
        return <p className="font-light text-sm text-gray-600">
            <strong className="font-medium">Disclaimer</strong>:
            Please note the above is calculated based on an assumption that
            the reversionary bonus of 4.2% is declared each year, and a terminal
            bonus of 2% is provided on maturity.
        </p>
    }
}