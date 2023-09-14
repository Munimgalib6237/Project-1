
import React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Text } from "../text"
import { PrimaryButton } from "../button"
import { isValidEmail } from "../../utils/helper"
import { TextField, PasswordField } from "../input-field"

export const ResetForm = (props) => {
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
                    label="New password"
                    name="password"
                    control={control}
                    defaultvalue={""}
                    error={errors.password && errors.password.message}
                    placeholder={"Enter password"}
                    rules={{ required: "Password is required" }}
                />
            </div>

            <div className="text-right mb-4">
                <Link href="/login">
                    <a>
                        <Text className="text-sm font-medium text-indigo-400">Back to login.</Text>
                    </a>
                </Link>
            </div>

            {/* Submit button */}
            <div className="text-right">
                <PrimaryButton
                    type="submit"
                    disabled={props.isLoading}
                >
                    {props.isLoading ? "Loading..." : "Submit"}
                </PrimaryButton>
            </div>
        </form>
    );
};