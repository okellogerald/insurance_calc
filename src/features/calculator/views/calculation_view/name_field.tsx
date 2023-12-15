import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { CalcFormControl } from "./calculation_view";

export default class NameField extends React.Component<{control: CalcFormControl}> {
    render(): React.ReactNode {
        return <FormField
            control={this.props.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />;
    }
}