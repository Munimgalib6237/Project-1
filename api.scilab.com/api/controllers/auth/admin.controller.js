
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = require("../../../models/admin.model")
const validator = require("../../validators/admin-auth.validator")

/* Login to account */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        /* Check validity */
        const validate = await validator.login(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Account find using email */
        const account = await Admin.findOne({ email })
        if (!account) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid email or password."
                }
            })
        }

        /* Compare with password */
        const result = await bcrypt.compare(password, account.password)
        if (!result) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid email or password."
                }
            })
        }

        /* Generate JWT token */
        const token = await jwt.sign(
            {
                id: account._id,
                name: account.name,
                role: account.role,
            }, process.env.JWT_SECRET, { expiresIn: '1d' }
        )

        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Reset account passwors */
const reset = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body

        /* Check validity */
        const validate = await validator.reset(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Account find using email */
        const account = await Admin.findOne({ email })
        if (!account) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Account not found."
                }
            })
        }

        /* hash password generate */
        const hashPassword = await bcrypt.hash(newPassword, 10)

        /* update account with new password */
        await Admin.findOneAndUpdate(
            { email },
            { $set: { password: hashPassword } }
        )

        res.status(201).json({
            status: true,
            message: "Password changes."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}


module.exports = {
    login,
    reset
}