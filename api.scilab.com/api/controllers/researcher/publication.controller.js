

const ObjectId = require("mongoose").Types.ObjectId
const Category = require("../../../models/category.model")
const Researcher = require("../../../models/researcher.model")
const Publication = require("../../../models/publication.model")
const validator = require("../../validators/publication.validator")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")
const { paginateQueryParams, paginate } = require("../../helper/pagination.helper")

/* List of items */
const index = async (req, res, next) => {
    try {
        const { id } = req.user
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Publication.countDocuments({ researcher: id })
        const results = await Publication.find(
            { researcher: id },
            {
                category: 1,
                researcher: 1,
                title: 1,
                publicationDate: 1,
                publisher: 1,
                isApproved: 1
            })
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

/* Show specific item */
const show = async (req, res, next) => {
    try {
        const { id } = req.params

        await isMongooseId(id)

        const result = await Publication.findById(id)
            .populate("category", "title")
            .exec()

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Store item */
const store = async (req, res, next) => {
    try {
        const { id, username } = req.user
        const {
            category,
            title,
            authors,
            publicationDate,
            conference,
            publisher,
            description
        } = req.body

        /* Check validation */
        const validate = await validator.store(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        await isMongooseId(category)

        const newPublication = new Publication({
            category,
            researcher: id,
            username,
            title,
            authors,
            publicationDate,
            conference,
            publisher,
            description
        })

        await newPublication.save()
        await Category.findByIdAndUpdate(
            category,
            { $push: { publications: newPublication._id } }
        )
        await Researcher.findByIdAndUpdate(
            id,
            { $push: { publications: newPublication._id } }
        )

        res.status(201).json({
            status: true,
            message: "Publication created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Update items */
const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const {
            category,
            title,
            authors,
            publicationDate,
            conference,
            publisher,
            description
        } = req.body

        /* Check validation */
        const validate = await validator.store(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        await isMongooseId(id)
        await isMongooseId(category)

        /* Check available */
        const isAvailable = await Publication.findById(id)
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: { message: "Publication not found." }
            })
        }

        /* Remove from old category */
        const isRemoveFromCategory = await Category.findByIdAndUpdate(
            isAvailable.category,
            { $pull: { "publications": { "$in": [new ObjectId(isAvailable._id)] } } }
        )

        if (!isRemoveFromCategory) {
            return res.status(500).json({
                status: false,
                errors: { message: "Something going wrong." }
            })
        }

        /* Add new category */
        await Category.findByIdAndUpdate(
            category,
            { $push: { publications: isAvailable._id } }
        )

        /* Update publication */
        await Publication.findByIdAndUpdate(
            id,
            {
                $set: {
                    category,
                    title,
                    authors,
                    publicationDate,
                    conference,
                    publisher,
                    description
                }
            }
        )

        res.status(201).json({
            status: true,
            message: "Publication updated."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Destroy item */
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params

        await isMongooseId(id)

        /* Check available */
        const isAvailable = await Publication.findById(id)
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: { message: "Publication not found." }
            })
        }

        /* Remove from category */
        const isRemoveFromCategory = await Category.findByIdAndUpdate(
            isAvailable.category,
            { $pull: { "publications": { "$in": [new ObjectId(id)] } } }
        )

        if (!isRemoveFromCategory) {
            return res.status(500).json({
                status: false,
                errors: { message: "Something going wrong." }
            })
        }

        /* Remove from researcher */
        const isRemoveFromResearcher = await Researcher.findByIdAndUpdate(
            isAvailable.researcher,
            { $pull: { "publications": { "$in": [new ObjectId(id)] } } }
        )

        if (!isRemoveFromResearcher) {
            return res.status(500).json({
                status: false,
                errors: { message: "Something going wrong." }
            })
        }

        await Publication.findByIdAndDelete(id)

        res.status(200).json({
            status: true,
            message: "Publication deleted."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Category items */
const categoryItems = async (req, res, next) => {
    try {
        const items = []
        const results = await Category.find({}, { title: 1 })

        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                const element = results[i]
                items.push({
                    value: element._id,
                    label: element.title
                })
            }
        }

        res.status(200).json({
            status: true,
            data: items
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
    store,
    update,
    destroy,
    categoryItems
}