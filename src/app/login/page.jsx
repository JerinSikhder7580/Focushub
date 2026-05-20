"use client"
import { authClient } from "@/lib/auth-client";
import { Button, Card, Checkbox, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email(
            {
                email: user.email,
                password: user.password,


            }
        )

        if (data) {
            router.push('/')
        }
        if (error) {
            alert(error.message || "Login failed")
        }

    }
    const handleGoogleSignIn = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        })

        if (error) {
            alert(error.message || "Google login failed")
        }
    }





    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center font-semibold text-2xl mb-5">
                <h1>Login</h1>
            </div>
            <Card className="border  p-7">
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4" >


                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex justify-center gap-2">
                        <Button className={"w-full"} type="submit">
                            <Checkbox />
                            LogIn                        </Button>

                    </div>
                </Form>
                <div className="space-y-3">
                    <p className="text-center border p-1 rounded-full">Or Sign up with</p>
                    <Button onClick={handleGoogleSignIn} className={'w-full bg-cyan-500'}><FcGoogle />
                        SignUp with Google</Button>
                </div>
                <h1>Don't have an account ? <Link className="text-cyan-500" href={"/register"}>Register</Link></h1>

            </Card>
        </div>
    );
};

export default LoginPage;
