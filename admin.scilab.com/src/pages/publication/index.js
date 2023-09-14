import React, { useCallback, useEffect, useState } from "react"
import { Unlock, X } from "react-feather"
import { dateTodate } from "../../helpers"
import { Card } from "../../components/card"
import { Services } from "../../http-services"
import { DataTable } from "../../components/table"
import { Toastify } from "../../components/toastify"
import { RightDrawer } from "../../components/right-drawer"
import { PrimaryButton, CircleButton } from "../../components/button"

const Index = () => {
    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(20)
    const [totalRows, setTotalRows] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [willChange, setWillChange] = useState(null)
    const [details, setDetails] = useState({ status: false, data: null })

    /* fetch data */
    const fetchData = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Services.Publication.index({ page, limit: perPage })
            if (response.status === 200) {
                setData(response.data.data)
                setTotalRows(response.data.pagination?.response.data.pagination.total_items)
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
    }, [perPage])

    useEffect(() => {
        fetchData(1)
    }, [fetchData])

    // handle paginate page change
    const handlePageChange = page => fetchData(page)

    // handle paginate row change
    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true)
        const response = await Services.Publication.index({ page, limit: newPerPage })
        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    // handle change status
    const handleStatusChange = async (id) => {
        try {
            setWillChange(id)
            const response = await Services.Publication.changeStatus(id)
            Toastify.Success(response.data.message)
            fetchData(1)
            setWillChange(null)
            console.log(response)
        } catch (error) {
            if (error) {
                setWillChange(null)

                if (error.response && error.response.data && error.response.data.errors) {
                    Object.keys(error.response.data.errors).map(item => {
                        return Toastify.Error(error.response.data.errors[item])
                    })
                }
            }
        }

    }

    // data columns
    const columns = [
        {
            name: "Date",
            sortable: true,
            width: "100px",
            selector: row => row.publicationDate ? dateTodate(row.publicationDate) : "N/A"
        },
        {
            name: "Title",
            grow: 1,
            selector: row => row.title
        },
        {
            name: "Approval",
            width: "120px",
            cell: row =>
                <PrimaryButton
                    type="button"
                    className="!px-3 !pt-[5px] !pb-[8px] !rounded-full"
                    disabled={willChange}
                    onClick={() => handleStatusChange(row._id)}
                >
                    <small>{willChange && willChange === row._id ? "Loading..." : row.isApproved ? "Approved" : "Pending"}</small>
                </PrimaryButton>
        },
        {
            name: "Details",
            width: "80px",
            cell: row =>
                <CircleButton
                    type="button"
                    onClick={() => setDetails({ data: row, status: true })}
                >
                    <Unlock size={20} />
                </CircleButton>
        }
    ]

    return (
        <div>
            <Card className="mb-3">
                <p className="text-[16px] text-gray-800 font-medium">Publications</p>
            </Card>

            <Card>
                <DataTable
                    data={data}
                    columns={columns}
                    loading={isLoading}
                    totalRows={totalRows}
                    noDataMessage="No publications available."
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                />
            </Card>


            {/* Publication details drawer*/}
            <RightDrawer
                show={details.status}
                onClick={() => setDetails({ data: null, status: false })}
            >
                <div className="flex justify-between p-4 border-b">
                    <p className="text-lg font-bold text-indigo-500 mt-1">{details.data && details.data.title}</p>
                    <div>
                        <CircleButton
                            type="button"
                            onClick={() => setDetails({ data: null, status: false })}
                        >
                            <X size={20} />
                        </CircleButton>
                    </div>
                </div>
                <div className="p-4">
                    {details.status && details.data ?
                        <>
                            {/* Category */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Category</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.category && details.data.category.title &&
                                        <p className="text-xs">{details.data.category.title}</p>
                                    }
                                </div>
                            </div>

                            {/* Authors */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Authors</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.authors && details.data.authors.length > 0 ?
                                        details.data.authors.map((item, i) =>
                                            <p className="text-xs mr-1" key={i}>{item}{i + 1 < details.data.authors.length ? "," : ""}</p>
                                        ) : null
                                    }
                                </div>
                            </div>

                            {/* Publication date */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Publication date</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.publicationDate &&
                                        <p className="text-xs">{dateTodate(details.data.publicationDate)}</p>
                                    }
                                </div>
                            </div>

                            {/* Publisher */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Publisher</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.publisher &&
                                        <p className="text-xs">{details.data.publisher}</p>
                                    }
                                </div>
                            </div>

                            {/* Conference */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Conference</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.conference &&
                                        <p className="text-xs">{details.data.conference}</p>
                                    }
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Description</p>
                                </div>
                                <div className="grow inline-flex">
                                    {details.data.description &&
                                        <p className="text-xs leading-loose">{details.data.description}</p>
                                    }
                                </div>
                            </div>
                        </>
                        : null
                    }

                </div>
            </RightDrawer>
        </div>
    );
};

export default Index;