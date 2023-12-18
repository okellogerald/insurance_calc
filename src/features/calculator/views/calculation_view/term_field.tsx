import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { ReactNode } from "react";
import { CalcFormControl } from "./calculation_view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

interface TermFieldProps {
    control: CalcFormControl,
    terms: number[],
    disabled: boolean,
    onSelect: (t: number) => void,
}

export default class TermField extends React.Component<TermFieldProps> {
    render(): ReactNode {
        return <FormField
            control={this.props.control}
            name="term"
            disabled={this.props.disabled}
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
                                        !field.value && "text-muted-foreground",
                                        this.props.disabled && "cursor-not-allowed"
                                    )}
                                >
                                    {field.value
                                        ? this.props.terms.find(
                                            (s) => s === field.value
                                        )?.toString()
                                        : "Select term"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        {
                            !this.props.disabled && <PopoverContent className="p-0">
                                <Command>
                                    <CommandInput placeholder="Search terms..." />
                                    <CommandEmpty>No terms found.</CommandEmpty>
                                    <CommandGroup>
                                        {this.props.terms.map((t) => {
                                            return (
                                                <CommandItem
                                                    value={t.toString()}
                                                    key={t.toString()}
                                                    onSelect={() => this.props.onSelect(t)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            t === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )} />
                                                    {t.toString()}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        }
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    }
}