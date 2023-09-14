
const paginateQueryParams = data => {
    let limit = 10
    let page = 1

    if (data.page) page = parseInt(data.page)
    if (data.page && parseInt(data.page) <= 0) page = 1

    if (data.limit) limit = parseInt(data.limit)
    if (data.limit && parseInt(data.limit) < 10) limit = 10

    return { limit, page }
}


const nextPage = (page, totalPage) => {
    if (page && page >= totalPage) {
        return null
    }
    return page + 1
}


const prevPage = (page) => {
    if (page && page === 1) {
        return null
    }
    return page - 1
}


const paginate = (data) => {
    const page = parseInt(data.page)
    const limit = parseInt(data.limit)
    const totalItems = parseInt(data.totalItems)

    if (!totalItems) return null

    const pageTotal = Math.ceil(totalItems / limit)
    return {
        total_items: totalItems,
        limit: limit,
        current_page: page,
        total_page: pageTotal,
        prev_page: prevPage(page),
        next_page: nextPage(page, pageTotal)
    }
}


module.exports = {
    paginateQueryParams,
    paginate
}