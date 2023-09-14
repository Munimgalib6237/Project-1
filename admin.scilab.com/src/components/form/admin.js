
import React from "react"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { isValidEmail, isValidPhone } from "../../helpers"
import { TextField, PasswordField } from "../input-field"

export const AdminFrom = (props) => {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => props.onSubmit(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Title */}
            <div className="mb-4">
                <TextField
                    label="Name"
                    name="name"
                    control={control}
                    defaultvalue={props?.data?.name}
                    error={errors.name && errors.name.message}
                    placeholder={"Enter name"}
                    rules={{ required: "Name is required" }}
                />
            </div>

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

            {/* Phone */}
            <div className="mb-4">
                <TextField
                    label="Phone number"
                    name="phone"
                    control={control}
                    defaultvalue={""}
                    error={errors.phone && errors.phone.message}
                    placeholder={"01XX-XXXX-XXX"}
                    rules={{
                        required: "Phone number is required",
                        pattern: {
                            value: isValidPhone(),
                            message: "Invalid phone number"
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

            {/* Submit button */}
            <div className="text-right">
                <PrimaryButton
                    type="submit"
                    disabled={props.isLoading}
                >
                    {props.isLoading ? "Creating..." : "Submit"}
                </PrimaryButton>
            </div>
        </form>
    );
};