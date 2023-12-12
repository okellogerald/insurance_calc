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
import { LogInManager, useLogInState } from "./manager";

function LogInPage() {
    const navigate = useNavigate();
    const logInState = useLogInState()
    const { toast } = useToast()

    const signUp = () => navigate("/signup");
    const goHome = () => navigate("/");

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
        await LogInManager.instance.logIn(values.email, values.password);
        if (logInState.error !== null) {
            toast({
                variant: "destructive",
                title: `Request failed with status code ${logInState.error.statusCode}`,
                description: logInState.error.message,
            })
        }
        if (logInState.user !== null) {
            goHome()
        }
    }

    return (
        <>
            <AuthLayout>
                <h3 className="text-center">Log In</h3>

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
                            logInState.loading ? <Button className="w-full" disabled>
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
                        Don't have an account yet?
                    </div>
                    <div className="text-primary font-semibold">
                        <a onClick={signUp} className="cursor-pointer">Sign Up</a>
                    </div>
                </div>
            </AuthLayout>
        </>
    )
}

export default LogInPage