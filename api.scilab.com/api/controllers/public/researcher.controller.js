
const Researcher = require("../../../models/researcher.model")
const Publication = require("../../../models/publication.model")
const { paginateQueryParams, paginate } = require("../../helper/pagination.helper")

/* List of items */
const index = async (req, res, next) => {
    try {
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Researcher.countDocuments()
        const results = await Researcher.find({},
            {
                name: 1,
                username: 1
            })
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

/* Show specific item */
const show = async (req, res, next) => {
    try {
        let profileData = null
        const { username } = req.params

        const result = await Researcher.findOne(
            { username },
            {
                role: 0,
                password: 0,
                createdAt: 0,
                updatedAt: 0
            })

        const publicationCount = await Publication.countDocuments({
            $and: [
                { researcher: result._id },
                { isApproved: true }
            ]
        })

        if (result && result._doc) {
            profileData = {
                ...result._doc,
                publications: publicationCount
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

/* Search profile resources */
const searchProfile = async (req, res, next) => {
    try {
        const { query } = req.query

        /* Validate query */
        if (!query) {
            return res.status(200).json({
                status: true,
                data: []
            })
        }

        const queryValue = new RegExp(query, 'i')
        const results = await Researcher.find(
            { name: queryValue },
            {
                name: 1,
                username: 1
            }
        )

        res.status(200).json({
            status: true,
            data: results
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
        const { username } = req.params
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Publication.countDocuments({ $and: [{ username }, { isApproved: true }] })
        const results = await Publication.find(
            { $and: [{ username }, { isApproved: true }] },
            {
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
    publications,
    searchProfile
}