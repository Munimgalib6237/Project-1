import React, { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Eye, Plus, Trash, X } from "react-feather"
import { Card } from "../../components/card"
import { DataTable } from "../../components/table"
import { Toastify } from "../../components/toastify"
import {
    CircleButton,
    PrimaryButton,
    DangerButton
} from "../../components/button"
import { RightDrawer } from "../../components/right-drawer"
import { Modal } from "../../components/modal"
import { Services } from "../../http-services"

const Index = () => {
    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(20)
    const [totalRows, setTotalRows] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [details, setDetails] = useState({ status: false, data: null })
    const [willDelete, setWillDelete] = useState({ id: null, show: false, loading: false })

    /* fetch data */
    const fetchData = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Services.Admin.index({ page, limit: perPage })
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
        const response = await Services.Admin.index({ page, limit: newPerPage })
        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    // handle delete
    const handleDelete = async () => {
        try {
            setWillDelete({ ...willDelete, loading: true })
            const response = await Services.Admin.destroy(willDelete.id)
            if (response && response.status === 200) {
                fetchData(1)
                Toastify.Success(response.data.message)
            }

            setWillDelete({ id: null, show: false, loading: false })
        } catch (error) {
            if (error) {
                setWillDelete({ id: null, show: false, loading: false })

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
            name: "Name",
            sortable: true,
            selector: row => row.name || "N/A"
        },
        {
            name: "Phone",
            sortable: true,
            selector: row => row.phone || "N/A"
        },
        {
            name: "Role",
            sortable: true,
            selector: row => row.role
        },
        {
            name: "Details",
            width: "120px",
            cell: row =>
                <div>
                    <CircleButton
                        type="button"
                        onClick={() => setDetails({ data: row, status: true })}
                    >
                        <Eye size={20} />
                    </CircleButton>

                    <CircleButton
                        type="button"
                        className="ml-1"
                        onClick={() => setWillDelete({ id: row._id, show: true, loading: false })}
                    >
                        <Trash size={20} />
                    </CircleButton>
                </div>
        }
    ]

    return (
        <div>
            <Card className="mb-3">
                <div className="flex">
                    <div className="pt-[7px]">
                        <p className="text-[16px] text-gray-800 font-medium">Admin list</p>
                    </div>
                    <div className="ml-auto">
                        <Link to="/dashboard/admin/create">
                            <CircleButton>
                                <Plus size={22} />
                            </CircleButton>
                        </Link>
                    </div>
                </div>
            </Card>

            <Card>
                <DataTable
                    data={data}
                    columns={columns}
                    loading={isLoading}
                    totalRows={totalRows}
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                    noDataMessage="No admin found expected you."
                />
            </Card>

            {/* Admin details drawer*/}
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
                            {/* Name */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Name</p>
                                </div>
                                <div className="grow inline-flex">
                                    <p className="text-xs">{details.data.name}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Email Address</p>
                                </div>
                                <div className="grow inline-flex">
                                    <p className="text-xs">{details.data.email}</p>
                                </div>
                            </div>

                            {/* Role */}
                            <div className="flex gap-4 mb-5">
                                <div className="min-w-[95px] text-right">
                                    <p className="text-xs text-gray-500">Access Role</p>
                                </div>
                                <div className="grow inline-flex">
                                    <p className="text-xs">{details.data.role}</p>
                                </div>
                            </div>

                            {/* Created By */}
                            {details.data.createdBy &&
                                <div className="flex gap-4 mb-5">
                                    <div className="min-w-[95px] text-right">
                                        <p className="text-xs text-gray-500">Account creator</p>
                                    </div>
                                    <div className="grow inline-flex">
                                        <p className="text-xs">{details.data.createdBy.name} ({details.data.createdBy.email})</p>
                                    </div>
                                </div>
                            }
                        </>
                        : null
                    }

                </div>
            </RightDrawer>

            {/* Delete confirmation */}
            <Modal
                show={willDelete.show}
                onHide={() => setWillDelete({ id: null, show: false, loading: false })}
                title="Are you sure?"
            >
                <div>
                    <p className="font-normal text-md text-gray-500">Want delete this admin.</p>

                    <div className="mt-4">
                        <PrimaryButton
                            disabled={willDelete.loading}
                            onClick={() => handleDelete()}
                        >
                            {willDelete.loading ? "Loading..." : "Yes"}
                        </PrimaryButton>

                        <DangerButton
                            className="ml-1"
                            onClick={() => setWillDelete({ id: null, show: false, loading: false })}
                        >No</DangerButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Index;