
const bcrypt = require("bcryptjs")
const Admin = require("../../../models/admin.model")
const validator = require("../../validators/admin-auth.validator")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")
const { paginateQueryParams, paginate } = require("../../helper/pagination.helper")

/* List of resources */
const index = async (req, res, next) => {
    try {
        const { id } = req.user
        const { limit, page } = paginateQueryParams(req.query)

        const totalItems = await Admin.countDocuments()
        const results = await Admin.find(
            { _id: { $ne: id } },
            { password: 0 }
        )
            .sort({ _id: -1 })
            .skip((parseInt(page) * parseInt(limit)) - parseInt(limit))
            .limit(parseInt(limit))
            .populate("createdBy", "name email phone role")
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

/* Create an account */
const store = async (req, res, next) => {
    try {
        const { id } = req.user
        const { name, email, phone, password } = req.body

        /* Check validity */
        const validate = await validator.register(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* check email available */
        const isEmailExist = await Admin.findOne({ email })
        if (isEmailExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    email: "Address already used."
                }
            })
        }

        /* check phone available */
        const isPhoneExist = await Admin.findOne({ phone })
        if (isPhoneExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    phone: "Phone number already used."
                }
            })
        }

        /* hash password generate */
        const hashPassword = await bcrypt.hash(password, 10)

        /* new admin */
        const newAdmin = new Admin({
            name,
            email,
            phone,
            createdBy: id,
            password: hashPassword
        })

        await newAdmin.save()

        res.status(201).json({
            status: true,
            message: "Admin created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Destroy an account */
const destroy = async (req, res, next) => {
    try {
        const userId = req.user.id
        const { id } = req.params

        await isMongooseId(id)

        /* Check my ID */
        if (id.toString() === userId.toString()) {
            return res.status(409).json({
                status: false,
                errors: {
                    message: "You can't delete yourself."
                }
            })
        }

        await Admin.findByIdAndDelete(id)

        res.status(200).json({
            status: true,
            message: "An admin deleted."
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
    store,
    destroy
}