
import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Text } from "../text"
import { PrimaryButton } from "../button"
import { isValidEmail } from "../../utils/helper"
import { TextField, PasswordField } from "../input-field"

export const LoginForm = (props) => {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => props.onSubmit(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Email */}
            <div className="mb-4">
                <TextField
                    label="E-mail"
                    name="email"
                    control={control}
                    defaultvalue={""}
                    error={errors.email && errors.email.message}
                    placeholder={"example@gmail.com"}
                    rules={{
                        required: "E-mail is required",
                        pattern: {
                            value: isValidEmail(),
                            message: "Invalid email address"
                        }
                    }}
                />
            </div>

            {/* Password */}
            <div className="mb-4">
                <PasswordField
                    label="Password"
                    name="password"
                    control={control}
                    defaultvalue={""}
                    error={errors.password && errors.password.message}
                    placeholder={"Enter password"}
                    rules={{ required: "Password is required" }}
                />
            </div>

            <div className="text-right mb-4">
                <p className="inline-flex text-sm">
                    Have no accout?
                    <Link href="/create-account">
                        <a>
                            <Text className="ml-1 text-sm font-medium text-indigo-400">Create account</Text>
                        </a>
                    </Link>
                </p>
                <Link href="/reset">
                    <a>
                        <Text className="text-sm font-medium text-indigo-400">Forgot password?</Text>
                    </a>
                </Link>
            </div>

            {/* Submit button */}
            <div className="text-right">
                <PrimaryButton
                    type="submit"
                    disabled={props.isLoading}
                >
                    {props.isLoading ? "Loading..." : "Login"}
                </PrimaryButton>
            </div>
        </form>
    );
};