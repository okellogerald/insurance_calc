import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { ReactNode } from "react";
import { CalcFormControl } from "./calculation_view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface SumAssuredPickerProps {
    control: CalcFormControl,
    sumAssureds: number[],
    disabled: boolean,
    onSelect: (s: number) => void,
}

export default class SumAssuredPicker extends React.Component<SumAssuredPickerProps> {
    render(): ReactNode {
        return <FormField
            control={this.props.control}
            name="sum_assured"
            disabled={this.props.disabled}
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
                                            (s) => s === field.value
                                        )?.toString()
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
                                            value={s.toString()}
                                            key={s.toString()}
                                            onSelect={() => this.props.onSelect(s)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    s === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {s.toString()}
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