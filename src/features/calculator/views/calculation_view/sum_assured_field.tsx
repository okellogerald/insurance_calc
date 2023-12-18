import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { CalcFormControl } from "./calculation_view";

export default class SumAssuredField extends React.Component<{ control: CalcFormControl, disabled: boolean }> {
    render(): React.ReactNode {
        return <FormField
            control={this.props.control}
            name="sum_assured"
            disabled={this.props.disabled}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Sum Assured</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />;
    }
}