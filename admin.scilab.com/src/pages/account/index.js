import React, { useCallback, useEffect, useState } from "react"
import { Card } from "../../components/card"
import { Services } from "../../http-services"
import { Toastify } from "../../components/toastify"
import { TableLoader } from "../../components/loader"
import { NoContent } from "../../components/no-content"

const Index = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [serverErr, setServerError] = useState(false)

    /* fetch data */
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await Services.Account.me()
            if (response.status === 200 && response.data.data) {
                setData(response.data.data)
            } else {
                setServerError(true)
            }
            setLoading(false)
        } catch (error) {
            if (error) {
                setLoading(false)
                setServerError(true)
                if (error.response && error.response.data && error.response.data.errors) {
                    Toastify.Error(error.response.data.errors.message)
                }
            }
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <div className="w-full lg:w-[550px]">

            {/* Data loading */}
            {isLoading && !data && !serverErr ?
                <Card>
                    <TableLoader />
                </Card>
                : null
            }

            {/* Server error */}
            {!isLoading && !data && serverErr ?
                <Card>
                    <NoContent message="No result found." />
                </Card>
                : null
            }

            {/* Data successfully loaded */}
            {data &&
                <Card className="!p-5">
                    <p className="font-bold text-base mb-5">Account information</p>
                    <div>
                        {/* Name */}
                        <div className="flex gap-4 mb-2">
                            <div className="min-w-[90px]">
                                <p className="text-sm text-gray-500">Name</p>
                            </div>
                            <div className="grow inline-flex">
                                <p className="text-sm">{data.name}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex gap-4 mb-2">
                            <div className="min-w-[90px]">
                                <p className="text-sm text-gray-500">Email</p>
                            </div>
                            <div className="grow inline-flex">
                                <p className="text-sm">{data.email}</p>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex gap-4 mb-2">
                            <div className="min-w-[90px]">
                                <p className="text-sm text-gray-500">Access Role</p>
                            </div>
                            <div className="grow inline-flex">
                                <p className="text-sm">{data.role}</p>
                            </div>
                        </div>

                        {/* Created By */}
                        {data.createdBy &&
                            <div className="flex gap-4 mb-2">
                                <div className="min-w-[90px]">
                                    <p className="text-sm text-gray-500">Account creator</p>
                                </div>
                                <div className="grow inline-flex">
                                    <p className="text-sm">{data.createdBy.name} ({data.createdBy.email})</p>
                                </div>
                            </div>
                        }
                    </div>
                </Card>
            }
        </div>
    );
};

export default Index;