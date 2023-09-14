
const Publication = require("../../../models/publication.model")
const { paginateQueryParams, paginate } = require("../../helper/pagination.helper")

/* List of items */
const index = async (req, res, next) => {
    try {
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Publication.countDocuments()
        const results = await Publication.find()
            .sort({ _id: -1 })
            .skip((parseInt(page) * parseInt(limit)) - parseInt(limit))
            .limit(parseInt(limit))
            .populate("category", "title")
            .exec()

        res.status(200).json({
            status: true,
            data: results,
            pagination: paginate({ page, limit, totalItems })
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


/* Update specific resource */
const update = async (req, res, next) => {
    try {
        const { id } = req.params

        const isAvailable = await Publication.findById(id)
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: { message: "Publication not found." }
            })
        }

        await Publication.findByIdAndUpdate(id, { $set: { isApproved: !isAvailable.isApproved } })

        res.status(200).json({
            status: true,
            message: "Status updated."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


module.exports = {
    index,
    update
}