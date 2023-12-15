import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { ReactNode } from "react";
import { CalcFormControl } from "./calculation_view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { SumAssured } from "../../models/quote_props";

interface SumAssuredFieldProps {
    control: CalcFormControl,
    sumAssureds: SumAssured[],
    onSelect: (s: SumAssured) => void,
}

export default class SumAssuredField extends React.Component<SumAssuredFieldProps> {
    render(): ReactNode {
        return <FormField
            control={this.props.control}
            name="sum_assured"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Sum Assured</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? this.props.sumAssureds.find(
                                            (s) => s.value === field.value
                                        )?.label
                                        : "Select sum assured"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                            <Command>
                                <CommandInput placeholder="Search sum assured..." />
                                <CommandEmpty>No language found.</CommandEmpty>
                                <CommandGroup>
                                    {this.props.sumAssureds.map((s) => (
                                        <CommandItem
                                            value={s.label}
                                            key={s.id}
                                            onSelect={() => this.props.onSelect(s)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    s.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {s.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    }
}