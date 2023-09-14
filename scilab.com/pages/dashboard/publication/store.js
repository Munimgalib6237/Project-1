
import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "react-feather"
import { withAuth } from "../../../hook/with-auth"
import { Toastify } from "../../../components/toastify"
import { CircleIconButton } from "../../../components/button"
import { DashboardLayout } from "../../../components/dashboard-layout"
import { PublicationForm } from "../../../components/form/publication"
import { DashboardPublicationCreate } from "../../../components/preloader"
import { PrivateCategoryItems, PublicationStore } from "../../api"

const store = () => {
    const [categories, setCategories] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)

    /* Fetch category data */
    const fetchData = useCallback(async () => {
        try {
            const response = await PrivateCategoryItems()
            if (response && response.status === 200) {
                setCategories(response?.data?.data)
            }

            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                console.log(error.response)
            }
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    /* Handle form submission */
    const handleSubmit = async (data) => {
        try {
            setCreating(true)
            const formData = {
                ...data,
                category: data.category.value,
                authors: data.authors.map(x => { return x.value })
            }

            const response = await PublicationStore(formData)
            if (response && response.status === 201) {
                Toastify.Success(response?.data?.message)
            }

            setCreating(false)
        } catch (error) {
            if (error) {
                setCreating(false)

                if (error.response && error.response.data && error.response.data.errors) {
                    Object.keys(error.response.data.errors).map(item => {
                        return Toastify.Error(error.response.data.errors[item])
                    })
                }
            }
        }
    }

    return (
        <div>
            <DashboardLayout>
                <div className="px-4 pt-4 pb-10 bg-white rounded-md">
                    <div className="flex mb-4">
                        <div>
                            <p className="text-md font-medium">New publication</p>
                        </div>
                        <div className="ml-auto">
                            <Link href="/dashboard/publication">
                                <a>
                                    <CircleIconButton>
                                        <ChevronLeft size={18} />
                                    </CircleIconButton>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-4/5 mx-auto lg:border lg:rounded-lg lg:shadow-md lg:p-6">

                        {isLoading ?
                            <DashboardPublicationCreate /> :

                            <PublicationForm
                                data={null}
                                isLoading={creating}
                                categories={categories}
                                onSubmit={value => handleSubmit(value)}
                            />
                        }
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
};

export default withAuth(store);