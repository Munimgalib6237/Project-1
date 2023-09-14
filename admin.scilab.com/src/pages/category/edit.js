import React, { useState, useEffect, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronLeft } from "react-feather"
import { Card } from "../../components/card"
import { CircleButton } from "../../components/button"
import { CategoryForm } from "../../components/form/category"
import { Toastify } from "../../components/toastify"
import { CategoryLoader } from "../../components/loader"
import { NoContent } from "../../components/no-content"
import { Services } from "../../http-services"

const Edit = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [isUpdate, setUpdate] = useState(false)

    /* fetch data */
    const fetchData = useCallback(async () => {
        try {
            const response = await Services.Category.show(id)
            if (response.status === 200) {
                setData(response.data.data)
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                if (error.response && error.response.data && error.response.data.errors) {
                    Toastify.Error(error.response.data.errors.message)
                }
            }
        }
    }, [id])

    useEffect(() => {
        fetchData()
    }, [id, fetchData])

    /* Handle submit */
    const handleSubmit = async (data) => {
        try {
            setUpdate(true)
            const response = await Services.Category.edit(id, data)
            if (response && response.status === 201) {
                Toastify.Success(response.data.message)
            }

            setUpdate(false)
        } catch (error) {
            if (error) {
                setUpdate(false)

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

            {!data && isLoading ? <CategoryLoader /> : null}
            {!data && !isLoading ?
                <Card>
                    <NoContent message="Category not available." />
                </Card>
                : null
            }

            {data && !isLoading ?
                <Card className="mb-3">
                    <div className="flex">
                        <div className="pt-[7px]">
                            <p className="text-[16px] text-gray-800 font-medium">Edit category</p>
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
                            data={data}
                            isLoading={isUpdate}
                            onSubmit={data => handleSubmit(data)}
                        />
                    </div>
                </Card>
                : null
            }
        </div>
    );
};

export default Edit;