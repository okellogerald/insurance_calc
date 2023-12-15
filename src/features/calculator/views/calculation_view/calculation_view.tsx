"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"
import { useToast } from "@/components/ui/use-toast"
import APIError from "@/models/error"
import React from "react"
import AuthLayout from "@/layouts/auth_layout"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Plan } from "@/features/plans/models/plan"
import { SumAssured } from "../../models/quote_props"

export default class CalculationView extends React.Component<{ plans: Plan[] }> {
    render(): React.ReactNode {
        return <AuthLayout>
            <h3 className="text-center mt-4">GET A QUOTE</h3>
            <CalcForm plans={this.props.plans} />
        </AuthLayout>
    }
}

const sumAssureds : SumAssured[]= []
const terms : Term[]= []

const CalcForm: React.FC<{ plans: Plan[] }> = ({ plans }) => {
    // hooks
    const { toast } = useToast()
    const navigate = useNavigate()

    // 1. Define your schema
    const formSchema = z.object({
        name: z.string(),
        dob: z.date(),
        plan: z.string(),
        sum_assured: z.number(),
        term: z.number(),
    })

    // 2. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    // 3. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const onError = (error: APIError) => {
            toast({
                variant: "destructive",
                title: `Request failed with status code ${error.statusCode}`,
                description: error.message,
            })
        }

        const onSuccess = () => {
            toast({
                title: `Registration was successful`,
                description: 'Please log in to your account',
            })
            navigate("/login")
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormDescription>
                            Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
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
                                        {field.value
                                            ? plans.find(
                                                (p) => p.name === field.value
                                            )?.name
                                            : "Select plan"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className=" p-0">
                                <Command>
                                    <CommandInput placeholder="Search plan..." />
                                    <CommandEmpty>No language found.</CommandEmpty>
                                    <CommandGroup>
                                        {plans.map((p) => (
                                            <CommandItem
                                                value={p.name}
                                                key={p.id}
                                                onSelect={() => {
                                                    form.setValue("plan", p.name)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        p.name === field.value
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

            <FormField
                control={form.control}
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
                                            ? sumAssureds.find(
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
                                        {sumAssureds.map((s) => (
                                            <CommandItem
                                                value={s.label}
                                                key={s.id}
                                                onSelect={() => {
                                                    form.setValue("sum_assured", s.value)
                                                }}
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

            <FormField
                control={form.control}
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
                                            ? terms.find(
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
                                        {terms.map((s) => (
                                            <CommandItem
                                                value={s.label}
                                                key={s.id}
                                                onSelect={() => {
                                                    form.setValue("term", s.value)
                                                }}
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

            <Button className="w-full">Submit</Button>
            <p className="font-light text-sm text-gray-600"><strong className="font-medium">Disclaimer</strong>: Please note the above is calculated based on an assumption that the reversionary bonus of 4.2% is declared each year, and a terminal bonus of 2% is provided on maturity.</p>
        </form>
    </Form>
}