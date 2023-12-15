import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Plan } from "@/features/plans/models/plan";
import { CalcFormControl } from "./calculation_view";

export default class PlanField extends React.Component<{ control: CalcFormControl, plans: Plan[], onSelect: (p: Plan) => void }> {
    isSelected(p1: Plan, value: string): boolean {
        const p2 = this.props.plans.find((p) => p.name === value)
        return p1.id === p2?.id
    }

    render(): ReactNode {
        return <FormField
            control={this.props.control}
            name="plan"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Plan</FormLabel>
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
                                    {field.value ?? "Select plan"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                            <Command>
                                <CommandInput placeholder="Search plan..." />
                                <CommandEmpty>No plan found.</CommandEmpty>
                                <CommandGroup>
                                    {this.props.plans.map((p) => (
                                        <CommandItem
                                            value={p.name}
                                            key={p.id}
                                            onSelect={() => this.props.onSelect(p)}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    this.isSelected(p, field.value)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {p.name}
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