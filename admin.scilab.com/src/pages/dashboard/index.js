import React, { useCallback, useEffect, useState } from "react"
import millify from "millify"
import { Card } from "../../components/card"
import { Services } from "../../http-services"
import { Toastify } from "../../components/toastify"
import { TableLoader } from "../../components/loader"
import { NoContent } from "../../components/no-content"

const Index = () => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [serverError, setServerError] = useState(false)

    /* fetch data */
    const fetchData = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Services.Dashboard.index()
            if (response.status === 200) {
                setData(response.data.data)
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
        <div>

            {/* Data loading */}
            {isLoading && !data && !serverError ?
                <Card>
                    <TableLoader />
                </Card>
                : null
            }

            {/* Server error */}
            {!isLoading && !data && serverError ?
                <Card>
                    <NoContent message="No result found." />
                </Card>
                : null
            }

            {data &&
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="text-center">
                        <div className="p-4">
                            <p className="text-4xl font-thin">{millify(data.category)}+</p>
                            <p className="text-xl font-bold text-gray-300">Category</p>
                        </div>
                    </Card>
                    <Card className="text-center">
                        <div className="p-4">
                            <p className="text-4xl font-thin">{millify(data.researcher)}+</p>
                            <p className="text-xl font-bold text-gray-300">Researcher</p>
                        </div>
                    </Card>
                    <Card className="text-center">
                        <div className="p-4">
                            <p className="text-4xl font-thin">{millify(data.publication)}+</p>
                            <p className="text-xl font-bold text-gray-300">Publications</p>
                        </div>
                    </Card>
                </div>
            }
        </div>
    );
};

export default Index;