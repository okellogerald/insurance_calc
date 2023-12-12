"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AuthLayout from "@/layouts/auth_layout"
import { useNavigate } from "react-router"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { SignUpManager } from "./manager"
import { match } from "ts-pattern";
import APIError from "@/models/error"
import { useSignUpState } from "./signup_state"

export function SignUpPage() {
    return <>
        <AuthLayout>
            <h3 className="text-center">Sign Up</h3>
            <SignUpForm />
            <LogInPrompt />
        </AuthLayout>
    </>
}

function SignUpForm() {
    // hooks
    const { toast } = useToast()
    const navigate = useNavigate()

    // 1. Define your schema
    const formSchema = z.object({
        email: z.string().email({ message: "Please provide a valid email" }),
        password: z.string().min(6, { message: "Password must have 6 characters or more." })
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

        await SignUpManager.instance.signUp(values.email, values.password);
        match(useSignUpState.getState())
            .with({ kind: "error" }, ({ error }) => onError(error))
            .with({ kind: "success" }, onSuccess)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <SubmitButton />
        </form>
    </Form>
}

function SubmitButton() {
    const state = useSignUpState()
    const loading = match(state)
        .with({ "kind": "loading" }, ({ loading }) => loading)
        .otherwise(() => false)

    return <div className="mt-4">
        {
            loading ? <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </Button>
                :
                <Button className="w-full" type="submit" >Submit</Button>
        }
    </div>
}

function LogInPrompt() {
    const navigate = useNavigate();
    const goToLogInPage = () => navigate('/login')

    return <>
        <div className="flex place-content-end mt-4">
            <div className="text-gray-500 mr-2">
                Have an account already?
            </div>
            <div className="text-primary font-semibold">
                <a onClick={goToLogInPage} className="cursor-pointer">Log In</a>
            </div>
        </div>
    </>
}

export default SignUpPage