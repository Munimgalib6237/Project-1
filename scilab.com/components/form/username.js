
import React from "react"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { TextField } from "../input-field"

export const UsernameForm = (props) => {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => props.onSubmit(data)

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-5">
                    <TextField
                        label="Username"
                        name="username"
                        control={control}
                        defaultvalue={props?.data?.username}
                        error={errors.username && errors.username.message}
                        placeholder={"Enter username"}
                        rules={{ required: "Username is required" }}
                    />
                </div>

                <div className="text-right">
                    <PrimaryButton
                        type="submit"
                        disabled={props.loading}
                    >{props.loading ? "Saving..." : "Save changes"}</PrimaryButton>
                </div>
            </form>
        </div>
    );
}