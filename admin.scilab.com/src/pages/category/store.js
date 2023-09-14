import React, { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft } from "react-feather"
import { Card } from "../../components/card"
import { CircleButton } from "../../components/button"
import { CategoryForm } from "../../components/form/category"
import { Toastify } from "../../components/toastify"
import { Services } from "../../http-services"

const Store = () => {
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Services.Category.store(data)
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
        <div className="w-full lg:w-[500px] mx-auto">
            <Card className="mb-3">
                <div className="flex">
                    <div className="pt-[7px]">
                        <p className="text-[16px] text-gray-800 font-medium">Create category</p>
                    </div>
                    <div className="ml-auto">
                        <Link to="/dashboard/category">
                            <CircleButton>
                                <ChevronLeft size={22} />
                            </CircleButton>
                        </Link>
                    </div>
                </div>

                <div className="pt-8">
                    <CategoryForm
                        isLoading={isLoading}
                        onSubmit={data => handleSubmit(data)}
                    />
                </div>
            </Card>
        </div>
    );
};

export default Store;