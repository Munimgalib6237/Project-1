import React, { useCallback, useEffect, useState } from "react"
import { Plus } from "react-feather"
import { Link } from "react-router-dom"
import { Edit2, Trash2 } from "react-feather"
import { Card } from "../../components/card"
import {
    CircleButton,
    PrimaryButton,
    DangerButton
} from "../../components/button"
import { Toastify } from "../../components/toastify"
import { DataTable } from "../../components/table"
import { Modal } from "../../components/modal"
import { Services } from "../../http-services"
import { Text } from "../../components/text"

const Index = () => {
    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(20)
    const [totalRows, setTotalRows] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const [willDelete, setWillDelete] = useState({ id: null, show: false, loading: false })

    /* fetch data */
    const fetchData = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Services.Category.index({ page, limit: perPage })
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
        const response = await Services.Category.index({ page, limit: newPerPage })
        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    // data columns
    const columns = [
        {
            name: "Title",
            sortable: true,
            selector: row => row.title || "N/A"
        },
        {
            name: "Publications",
            sortable: true,
            selector: row => row.publications ? row.publications.length : 0
        },
        {
            name: "Action",
            grow: 0,
            minWidth: "120px",
            cell: row =>
                <div>
                    <Link to={`/dashboard/category/${row._id}/edit`}>
                        <CircleButton type="button">
                            <Edit2 size={18} />
                        </CircleButton>
                    </Link>

                    <CircleButton
                        type="button"
                        className="ml-1"
                        onClick={() => setWillDelete({ id: row._id, show: true, loading: false })}
                    >
                        <Trash2 size={18} />
                    </CircleButton>
                </div>
        }
    ]

    // handle delete
    const handleDelete = async () => {
        try {
            setWillDelete({ ...willDelete, loading: true })
            const response = await Services.Category.destroy(willDelete.id)
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

    return (
        <div>
            <Card className="mb-3">
                <div className="flex">
                    <div className="pt-[7px]">
                        <p className="text-[16px] text-gray-800 font-medium">Category list</p>
                    </div>
                    <div className="ml-auto">
                        <Link to="/dashboard/category/store">
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
                />
            </Card>

            {/* Delete confirmation */}
            <Modal
                show={willDelete.show}
                onHide={() => setWillDelete({ id: null, show: false, loading: false })}
                title="Are you sure?"
            >
                <div>
                    <Text className="font-normal text-md text-gray-500">Want delete this category.</Text>

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