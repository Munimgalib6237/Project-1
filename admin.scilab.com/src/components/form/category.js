
import React from "react"
import { Edit2 } from "react-feather"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { TextField } from "../input-field"


export const CategoryForm = (props) => {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => props.onSubmit(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* Title */}
            <div className="mb-4">
                <TextField
                    label="Category title"
                    name="title"
                    control={control}
                    defaultvalue={props?.data?.title}
                    error={errors.title && errors.title.message}
                    placeholder={"Enter title"}
                    icon={<Edit2 size={18} />}
                    rules={{ required: "Title is required" }}
                />
            </div>

            <div className="text-right">
                <PrimaryButton disabled={props.isLoading}>
                    {props.isLoading ? "Loading..." : "Submit"}
                </PrimaryButton>
            </div>
        </form>
    );
};