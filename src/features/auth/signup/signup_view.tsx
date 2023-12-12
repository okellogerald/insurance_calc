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
import { SignUpManager, useSignUpState } from "./manager"
import { match } from "ts-pattern";
import APIError from "@/models/error"

export function SignUpPage() {
    const state = useSignUpState()
    const { toast } = useToast()
    const navigate = useNavigate();

    const loading = match(state)
        .with({ "kind": "loading" }, ({ loading }) => loading)
        .otherwise(() => false)

    const goToLogInPage = () => navigate("/login");

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
        goToLogInPage()
    }

    const formSchema = z.object({
        email: z.string().email({
            message: "Please provide a valid email",
        }),
        password: z.string().min(6, {
            message: "Password must have 6 characters or more."
        })
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        await SignUpManager.instance.signUp(values.email, values.password);
        console.log("---------")
        console.log(state)
        console.log("---------")
        match(state)
            .with({ kind: "error" }, ({ error }) => onError(error))
            .with({ kind: "success" }, onSuccess)
    }

    return <>
        <AuthLayout>
            <h3 className="text-center">Sign Up</h3>
            <Form {...form}>
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

                    <div className="mt-5"></div>

                    {
                        loading ? <Button className="w-full" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                            :
                            <Button className="w-full" type="submit" >Submit</Button>
                    }
                </form>
            </Form>

            <div className="flex place-content-end mt-4">
                <div className="text-gray-500 mr-2">
                    Have an account already?
                </div>
                <div className="text-primary font-semibold">
                    <a onClick={goToLogInPage} className="cursor-pointer">Log In</a>
                </div>
            </div>

        </AuthLayout>
    </>
}

export default SignUpPage