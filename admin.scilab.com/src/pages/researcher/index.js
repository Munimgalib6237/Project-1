import React, { useCallback, useEffect, useState } from "react"
import { Eye } from "react-feather"
import { Link } from "react-router-dom"
import { Card } from "../../components/card"
import { CircleButton } from "../../components/button"
import { Toastify } from "../../components/toastify"
import { DataTable } from "../../components/table"
import { Services } from "../../http-services"

const Index = () => {
    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(20)
    const [totalRows, setTotalRows] = useState(0)
    const [isLoading, setLoading] = useState(true)

    /* fetch data */
    const fetchData = useCallback(async (page) => {
        try {
            setLoading(true)
            const response = await Services.Researcher.index({ page, limit: perPage })
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
        const response = await Services.Researcher.index({ page, limit: newPerPage })
        setData(response.data.data)
        setPerPage(newPerPage)
        setLoading(false)
    }

    // data columns
    const columns = [
        {
            name: "Name",
            sortable: true,
            selector: row => row.name || "N/A"
        },
        {
            name: "Country",
            sortable: true,
            selector: row => row.country || "N/A"
        },
        {
            name: "Publications",
            sortable: true,
            minWidth: "110px",
            selector: row => row.publications
        },
        {
            name: "Action",
            grow: 0,
            minWidth: "100px",
            cell: row =>
                <Link to={`/dashboard/researcher/${row._id}`}>
                    <CircleButton type="button">
                        <Eye size={18} />
                    </CircleButton>
                </Link>
        }
    ]

    return (
        <div>
            <Card className="mb-3">
                <p className="text-[16px] text-gray-800 font-medium">Researchers</p>
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
        </div>
    );
};

export default Index;