
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { PrimaryButton } from "../button"
import { TextField, TextAreaField } from "../input-field"
import { ReactCountrySelectComponent } from "react-country-select-component"

export const ProfileForm = (props) => {
    const { control, handleSubmit, formState: { errors }, setValue, setError, clearErrors } = useForm()

    useEffect(() => {
        if (props.data && props.data.country) {
            setValue('country', props.data.country)
        }
    }, [])

    const onSubmit = data => {
        if (!data.country) {
            setError("country", {
                type: "manual",
                message: "Country is required.",
            })
            return
        }

        props.onSubmit(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Name */}
                <div className="mb-5">
                    <TextField
                        label="Name"
                        name="name"
                        control={control}
                        defaultvalue={props?.data?.name}
                        error={errors.name && errors.name.message}
                        placeholder={"Your name"}
                        rules={{ required: "Name is required" }}
                    />
                </div>

                {/* Address */}
                <div className="mb-5">
                    <TextField
                        label="Address"
                        name="address"
                        control={control}
                        defaultvalue={props?.data?.address}
                        error={errors.address && errors.address.message}
                        placeholder={"Your address"}
                        rules={{ required: "Address is required" }}
                    />
                </div>

                {/* Country */}
                <div className="mb-5">
                    <ReactCountrySelectComponent
                        name={'country'}
                        isClearable={true}
                        error={errors.country && errors.country.message}
                        label='Country'
                        placeholder={'Select country'}
                        borderRadius={6}
                        defaultvalue={
                            props?.data?.country ?
                                {
                                    label: props.data.country,
                                    value: props.data.country
                                }
                                : null
                        }
                        onChange={(event) => {
                            if (event && event.value) {
                                setValue('country', event.value)
                                clearErrors("country")
                            } else {
                                setValue('country', null)
                            }
                        }}
                    />
                </div>

                {/* About */}
                <div className="mb-5">
                    <TextAreaField
                        label="About yourself"
                        name="about"
                        rows={4}
                        control={control}
                        defaultvalue={props?.data?.about}
                        error={errors.about && errors.about.message}
                        placeholder={"Write yourself"}
                        rules={{ required: "About is required" }}
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