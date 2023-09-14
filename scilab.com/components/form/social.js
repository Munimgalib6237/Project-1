import React from "react"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { TextField, DateField } from "../input-field"

export const SocialForm = (props) => {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => props.onSubmit(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Media title */}
            <div className="mb-4">
                <TextField
                    label="Media title"
                    name="title"
                    control={control}
                    defaultvalue={""}
                    error={errors.title && errors.title.message}
                    placeholder={"Facebook, Linkedin, Github ..."}
                    rules={{ required: "Media title is required" }}
                />
            </div>

            {/* Profile link */}
            <div className="mb-4">
                <TextField
                    label="Profile link"
                    name="link"
                    control={control}
                    defaultvalue={""}
                    error={errors.link && errors.link.message}
                    placeholder={"www.example.com/profile-id"}
                    rules={{ required: "Profile link is required" }}
                />
            </div>

            {/* Submit button */}
            <div className="text-right">
                <PrimaryButton
                    type="submit"
                    disabled={props.loading}
                >
                    {props.loading ? "Creating ..." : "Create"}
                </PrimaryButton>
            </div>
        </form>
    )
}