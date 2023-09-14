
import React from "react"
import { NoContent } from "../no-content"
import { TableLoader } from "../preloader"
import ReactDataTable from "react-data-table-component"

export const DataTable = (props) => {
    return (
        <ReactDataTable
            columns={props.columns}
            data={props.data}
            progressPending={props.loading}
            progressComponent={<TableLoader />}
            customStyles={props.customStyles}
            noDataComponent={<NoContent message={props.noDataMessage || "No content available."} />}
            pagination
            paginationServer
            paginationTotalRows={props.totalRows}
            onChangeRowsPerPage={props.handlePerRowsChange}
            onChangePage={props.handlePageChange}
        />
    );
};
