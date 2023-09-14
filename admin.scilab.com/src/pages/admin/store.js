import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft } from "react-feather"
import { Card } from "../../components/card"
import { CircleButton } from "../../components/button"
import { AdminFrom } from "../../components/form/admin"
import { Toastify } from "../../components/toastify"
import { Services } from "../../http-services"

const Store = () => {
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Services.Admin.store(data)
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
            }

            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)

                if (error.response && error.response.data && error.response.data.errors) {
                    Object.keys(error.response.data.errors).map(item => {
                        return Toastify.Error(error.response.data.errors[item])
                    })
                }
            }
        }
    }

    return (
        <div className="w-full lg:w-[550px] mx-auto">
            <Card className="mb-3 !p-5">
                <div className="flex">
                    <div className="pt-[7px]">
                        <p className="text-[16px] text-gray-800 font-medium">Create admin</p>
                    </div>
                    <div className="ml-auto">
                        <Link to="/dashboard/admin">
                            <CircleButton>
                                <ChevronLeft size={22} />
                            </CircleButton>
                        </Link>
                    </div>
                </div>

                <div className="pt-8">
                    <AdminFrom
                        isLoading={isLoading}
                        onSubmit={data => handleSubmit(data)}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Store;