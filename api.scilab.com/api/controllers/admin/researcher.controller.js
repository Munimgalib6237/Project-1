

const Researcher = require("../../../models/researcher.model")
const Publication = require("../../../models/publication.model")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")
const { paginateQueryParams, paginate } = require("../../helper/pagination.helper")

/* List of items */
const index = async (req, res, next) => {
    try {
        const items = []
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Researcher.countDocuments()
        const results = await Researcher.find({},
            {
                name: 1,
                username: 1,
                country: 1,
                publications: 1
            })
            .sort({ _id: -1 })
            .skip((parseInt(page) * parseInt(limit)) - parseInt(limit))
            .limit(parseInt(limit))
            .exec()

        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                const element = results[i]._doc
                items.push({
                    ...element,
                    publications: element.publications.length
                })
            }
        }

        res.status(200).json({
            status: true,
            data: items,
            pagination: paginate({ page, limit, totalItems })
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Show specific item */
const show = async (req, res, next) => {
    try {
        let profileData = null
        const { id } = req.params

        await isMongooseId(id)

        const result = await Researcher.findById(
            id,
            {
                role: 0,
                password: 0,
                createdAt: 0,
                updatedAt: 0
            })

        if (result && result._doc) {
            profileData = {
                ...result._doc,
                publications: result.publications.length
            }
        }

        res.status(200).json({
            status: true,
            data: profileData
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Publications */
const publications = async (req, res, next) => {
    try {
        const { id } = req.params
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Publication.countDocuments({ researcher: id })
        const results = await Publication.find(
            { researcher: id },
            {
                username: 0,
                researcher: 0,
                createdAt: 0,
                updatedAt: 0
            }
        )
            .populate("category", "title")
            .sort({ _id: -1 })
            .skip((parseInt(page) * parseInt(limit)) - parseInt(limit))
            .limit(parseInt(limit))
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


module.exports = {
    index,
    show,
    publications
}