
const Category = require("../../../models/category.model")
const validator = require("../../validators/category.validator")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")
const { paginateQueryParams, paginate } = require("../../helper/pagination.helper")

/* List of items */
const index = async (req, res, next) => {
    try {
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Category.countDocuments()
        const results = await Category.find()
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

        const result = await Category.findById(id, { publications: 0 })

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
        const { id } = req.user
        const { title } = req.body

        await isMongooseId(id)

        /* Check validation */
        const validate = await validator.store(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* check exist */
        const isExist = await Category.findOne({ title })
        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: `${title} already exist.`
                }
            })
        }

        /* new category */
        const newCategory = new Category({
            title,
            createdBy: id
        })

        await newCategory.save()

        res.status(201).json({
            status: true,
            message: "Category created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Update specific item */
const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title } = req.body

        /* Check validation */
        const validate = await validator.store(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        await isMongooseId(id)

        /* check title exist */
        const isExist = await Category.findOne({
            $and: [
                { _id: { $ne: id } },
                { title }
            ]
        })

        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: `${title} already exist.`
                }
            })
        }

        await Category.findByIdAndUpdate(id, { $set: { title } })

        res.status(201).json({
            status: true,
            message: "Category updated."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Destroy specific item */
const destroy = async (req, res, next) => {
    try {
        const { id } = req.params

        await isMongooseId(id)

        /* check available category */
        const isAvailable = await Category.findById(id)
        if (!isAvailable) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: `Category not found.`
                }
            })
        }

        if (isAvailable.publications && isAvailable.publications.length > 0) {
            return res.status(408).json({
                status: false,
                errors: {
                    message: `Category not deleteable.`
                }
            })
        }

        await Category.findByIdAndDelete(id)

        res.status(200).json({
            status: true,
            message: "Category deleted."
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
    destroy
}