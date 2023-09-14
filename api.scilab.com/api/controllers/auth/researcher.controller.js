
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Researcher = require("../../../models/researcher.model")
const validator = require("../../validators/researcher.validator")

/* Register an account */
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        /* Check validity */
        const validate = await validator.register(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* check email available */
        const isEmailExist = await Researcher.findOne({ email })
        if (isEmailExist) {
            return res.status(409).json({
                status: false,
                errors: {
                    email: "Address already used."
                }
            })
        }

        /* hash password generate */
        const hashPassword = await bcrypt.hash(password, 10)

        /* new researcher */
        const newResearcher = new Researcher({
            name,
            email,
            password: hashPassword
        })

        /* create account & update account _id to username */
        await newResearcher.save()
        await Researcher.findByIdAndUpdate(
            newResearcher._id,
            { $set: { username: newResearcher._id } }
        )

        res.status(201).json({
            status: true,
            message: "Account created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

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
        const account = await Researcher.findOne({ email })
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
                username: account.username,
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
        const account = await Researcher.findOne({ email })
        if (!account) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Account not found."
                }
            })
        }

        /* hash password generate */
        const hashPassword = await bcrypt.hash(password, 10)

        /* change new password */
        await Researcher.findOneAndUpdate(
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
    register,
    login,
    reset
}