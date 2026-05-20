"use client"
import { authClient } from "@/lib/auth-client";
import { Button, Card, Checkbox, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";


const RegisterPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())
        console.log(user)


        const { data, error } = await authClient.signUp.email(
            {
                email: user.email,
                password: user.password,
                name: user.name,
                image: user.image
            }
        )

        console.log({ data, error })

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
        <div className="max-w-md mx-auto p-5">
            <div className="text-center font-semibold text-2xl mb-5">
                <h1>Create Account</h1>
            </div>
            <Card className="border-2 p-2 border-cyan-600 ">
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4" >

                    <TextField
                        isRequired
                        name="name"
                        type="text"

                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter your name here" className={'w-full'} />
                        <FieldError />
                    </TextField>


                    <TextField
                        isRequired
                        name="image"
                        type="url"

                    >
                        <Label>Image</Label>
                        <Input placeholder="Enter your image url here"  className={'w-full'}/>
                        <FieldError />
                    </TextField>

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
                        <Input placeholder="john@example.com" className={'w-full'} />
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
                        <Input placeholder="Enter your password"  className={'w-full'}/>
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex justify-center gap-2">
                        <Button className={"w-full bg-cyan-500"} type="submit">
                            Create Account
                        </Button>

                    </div>
                </Form>
                <div className="space-y-3">
                    <p className="text-center border-2 border-cyan-600 p-1 rounded-full text-black block">Or Sign up with</p>
                    <Button onClick={handleGoogleSignIn} className={' bg-cyan-500 w-full'}><FcGoogle />
                        SignUp with Google</Button>
                </div>

                <h1 className="text-center">Already have an account ? <Link className="text-cyan-500" href={"/login"}>Login</Link>  </h1>
            </Card>
        </div>
    );
};

export default RegisterPage;
