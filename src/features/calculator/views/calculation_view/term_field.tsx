import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { ReactNode } from "react";
import { CalcFormControl } from "./calculation_view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Term } from "../../models/quote_props";

interface TermFieldProps {
    control: CalcFormControl,
    terms: Term[],
    onSelect: (t: Term) => void,
}

export default class TermField extends React.Component<TermFieldProps> {
    render(): ReactNode {
        return <FormField
            control={this.props.control}
            name="term"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Term</FormLabel>
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
                                        ? this.props.terms.find(
                                            (s) => s.value === field.value
                                        )?.label
                                        : "Select term"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                            <Command>
                                <CommandInput placeholder="Search terms..." />
                                <CommandEmpty>No language found.</CommandEmpty>
                                <CommandGroup>
                                    {this.props.terms.map((t) => (
                                        <CommandItem
                                            value={t.label}
                                            key={t.id}
                                            onSelect={() => this.props.onSelect(t)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    t.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {t.label}
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