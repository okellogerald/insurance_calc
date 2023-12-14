import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/auth_layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LogInManager } from "./manager";
import { useLogInState } from "./login_state";
import { match } from "ts-pattern";
import APIError from "@/models/error";

function LogInPage() {
    return (
        <>
            <AuthLayout>
                <h3 className="text-center">Log In</h3>
                <LogInForm />
                <SignUpPrompt />
            </AuthLayout>
        </>
    )
}

function LogInForm() {
    const navigate = useNavigate();
    const { toast } = useToast()


    // 1. Schema
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

        const onSuccess = () => navigate("/");

        await LogInManager.instance.logIn(values.email, values.password);
        match(useLogInState.getState())
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
    const state = useLogInState()
    const loading = match(state)
        .with({ "kind": "loading" }, ({ loading }) => loading)
        .otherwise(() => false)

    return <div className="mt-5">
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

function SignUpPrompt() {
    const navigate = useNavigate();
    const signUp = () => navigate("/signup");

    return <>
        <div className="flex place-content-end mt-4">
            <div className="text-gray-500 mr-2">
                Don't have an account yet?
            </div>
            <div className="text-primary font-semibold">
                <a onClick={signUp} className="cursor-pointer">Sign Up</a>
            </div>
        </div>
    </>
}


export default LogInPage