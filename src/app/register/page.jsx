"use client"

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Card,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const RegisterPage = () => {

    const router = useRouter();

    const onSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image
        })

        if (data) {
            router.push("/");
        }

        if (error) {
            alert(error.message || "Registration failed")
        }
    }

    const handleGoogleSignIn = async () => {

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/"
        })

        if (error) {
            alert(error.message || "Google login failed")
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">

            <div className="w-full max-w-md">

                {/* Title */}
                <div className="text-center font-semibold text-2xl sm:text-3xl mb-6">

                    <h1>
                        Create Account
                    </h1>

                </div>

                {/* Card */}
                <Card className="border-2 p-5 sm:p-7 border-cyan-600 shadow-lg">

                    {/* Form */}
                    <Form
                        onSubmit={onSubmit}
                        className="flex w-full flex-col gap-5"
                    >

                        {/* Name */}
                        <TextField
                            isRequired
                            name="name"
                            type="text"
                        >

                            <Label>Name</Label>

                            <Input
                                placeholder="Enter your name here"
                                className={'w-full'}
                            />

                            <FieldError />

                        </TextField>

                        {/* Image */}
                        <TextField
                            isRequired
                            name="image"
                            type="url"
                        >

                            <Label>Image</Label>

                            <Input
                                placeholder="Enter your image url here"
                                className={'w-full'}
                            />

                            <FieldError />

                        </TextField>

                        {/* Email */}
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

                            <Input
                                placeholder="john@example.com"
                                className={'w-full'}
                            />

                            <FieldError />

                        </TextField>

                        {/* Password */}



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

                            <Input
                                placeholder="Enter your password"
                                className={'w-full'}
                            />



                            <Description>
                                Must be at least 8 characters with 1 uppercase and 1 number
                            </Description>

                            <FieldError />

                        </TextField>

                        {/* Submit */}
                        <div className="flex justify-center gap-2 w-full">

                            <Button
                                className={"w-full bg-cyan-500"}
                                type="submit"
                            >
                                Create Account
                            </Button>

                        </div>

                    </Form>

                    {/* Divider */}
                    <div className="space-y-4 mt-5">

                        <p className="text-center border-2 border-cyan-600 p-2 rounded-full text-black text-sm sm:text-base">
                            Or Sign up with
                        </p>

                        {/* Google */}


                        <Button
                            onClick={handleGoogleSignIn}
                            className={'bg-cyan-500 w-full'}
                        >

                            <FcGoogle size={22} />

                            SignUp with Google

                        </Button>

                    </div>

                    {/* Login */}
                    <h1 className="text-center mt-5 text-sm sm:text-base">

                        Already have an account ?

                        <Link
                            className="text-cyan-500 ml-1"
                            href={"/login"}
                        >
                            Login
                        </Link>

                    </h1>



                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;