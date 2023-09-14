
import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { isValidEmail } from "../../helpers"
import { TextField, PasswordField } from "../input-field"
import { Text } from "../text"


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

            {/* New password */}
            <div className="mb-4">
                <PasswordField
                    label="New password"
                    name="newPassword"
                    control={control}
                    defaultvalue={""}
                    error={errors.newPassword && errors.newPassword.message}
                    placeholder={"Enter new password"}
                    rules={{ required: "New password is required" }}
                />
            </div>

            <div className="text-right mb-4">
                <Link to="/">
                    <Text className="text-md font-medium text-orange-500">Back to Login</Text>
                </Link>
            </div>

            {/* Submit button */}
            <div className="text-right">
                <PrimaryButton
                    type="submit"
                    disabled={props.isLoading}
                >
                    {props.isLoading ? "Loading..." : "Save Changes"}
                </PrimaryButton>
            </div>
        </form>
    );
};