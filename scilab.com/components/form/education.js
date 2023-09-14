import React from "react"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { TextField, DateField } from "../input-field"

export const EducationForm = (props) => {
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => props.onSubmit(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* School */}
            <div className="mb-4">
                <TextField
                    label="School"
                    name="school"
                    control={control}
                    defaultvalue={""}
                    error={errors.school && errors.school.message}
                    placeholder={"School name"}
                    rules={{ required: "School name is required" }}
                />
            </div>

            {/* Department */}
            <div className="mb-4">
                <TextField
                    label="Department"
                    name="department"
                    control={control}
                    defaultvalue={""}
                    error={errors.department && errors.department.message}
                    placeholder={"Department name"}
                    rules={{ required: "Department name is required" }}
                />
            </div>

            {/* Passing year */}
            <div className="mb-4">
                <DateField
                    label="Passing year"
                    name="passingYear"
                    control={control}
                    defaultvalue={""}
                    error={errors.passingYear && errors.passingYear.message}
                    placeholder={"Passing year"}
                    rules={{ required: "Passing year is required" }}
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