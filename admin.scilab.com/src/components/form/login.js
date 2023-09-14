
import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { isValidEmail } from "../../helpers"
import { TextField, PasswordField } from "../input-field"
import { Text } from "../text"


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
                <Link to="/reset">
                    <Text className="text-md font-medium text-orange-500">Forgot password?</Text>
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