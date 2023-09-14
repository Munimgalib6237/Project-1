
const voca = require("voca")
const ObjectId = require("mongoose").Types.ObjectId
const Researcher = require("../../../models/researcher.model")
const validator = require("../../validators/researcher.validator")
const { isMongooseId } = require("../../middleware/mongooseId.middleware")

/* My profile */
const me = async (req, res, next) => {
    try {
        let profileData = null
        const { id } = req.user

        const result = await Researcher.findById(id, { password: 0 })
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

/* Update profile */
const update = async (req, res, next) => {
    try {
        const { id } = req.user
        const {
            name,
            address,
            country,
            about
        } = req.body

        /* Update account */
        await Researcher.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    address,
                    country,
                    about
                }
            }
        )

        res.status(201).json({
            status: true,
            message: "Account updated."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Update username */
const updateUsername = async (req, res, next) => {
    try {
        const { id } = req.user
        const { username } = req.body

        if (!username) {
            return res.status(422).json({
                status: false,
                errors: { username: "Username is required." }
            })
        }

        /* slugify username */
        const slugifyUsername = await voca.slugify(username)

        /* check exist */
        const isExist = await Researcher.findOne({
            $and: [
                { _id: { $ne: id } },
                { username: slugifyUsername }
            ]
        })

        if (isExist) {
            return res.status(409).json({
                status: false,
                errors: { username: "Username already exist." }
            })
        }

        /* update new username */
        await Researcher.findByIdAndUpdate(
            id,
            { $set: { username: slugifyUsername } }
        )

        res.status(201).json({
            status: true,
            message: "Username updated."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Add word */
const addWork = async (req, res, next) => {
    try {
        const { id } = req.user
        const {
            organization,
            department,
            position,
            startFrom,
            endTo,
            onGoing
        } = req.body

        /* Check validity */
        const validate = await validator.addWork(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        const newWork = {
            organization,
            department,
            position,
            startFrom,
            endTo: onGoing ? null : endTo,
            onGoing: endTo ? false : true
        }

        /* find and update work */
        await Researcher.findByIdAndUpdate(
            id,
            { $push: { work: newWork } }
        )

        res.status(201).json({
            status: true,
            message: "Work created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Remove word */
const removeWork = async (req, res, next) => {
    try {
        const { id } = req.user
        const { work_id } = req.params

        await isMongooseId(work_id)

        /* find and update work */
        await Researcher.findByIdAndUpdate(
            id,
            { $pull: { "work": { "_id": [new ObjectId(work_id)] } } }
        )

        res.status(201).json({
            status: true,
            message: "Work removed."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Add education */
const addEducation = async (req, res, next) => {
    try {
        const { id } = req.user
        const {
            school,
            department,
            passingYear
        } = req.body

        /* Check validity */
        const validate = await validator.addEducation(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        const newEducation = {
            school,
            department,
            passingYear
        }

        /* find and update work */
        await Researcher.findByIdAndUpdate(
            id,
            { $push: { education: newEducation } }
        )

        res.status(201).json({
            status: true,
            message: "Education created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Remove education */
const removeEducation = async (req, res, next) => {
    try {
        const { id } = req.user
        const { education_id } = req.params

        await isMongooseId(education_id)

        /* find and update work */
        await Researcher.findByIdAndUpdate(
            id,
            { $pull: { "education": { "_id": [new ObjectId(education_id)] } } }
        )

        res.status(201).json({
            status: true,
            message: "Education removed."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Add social */
const addSocial = async (req, res, next) => {
    try {
        const { id } = req.user
        const {
            title,
            link
        } = req.body

        /* Check validity */
        const validate = await validator.addSocial(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        const newSocial = {
            title,
            link
        }

        /* find and update work */
        await Researcher.findByIdAndUpdate(
            id,
            { $push: { otherProfiles: newSocial } }
        )

        res.status(201).json({
            status: true,
            message: "Social created."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Remove social */
const removeSocial = async (req, res, next) => {
    try {
        const { id } = req.user
        const { social_id } = req.params

        await isMongooseId(social_id)

        /* find and update work */
        await Researcher.findByIdAndUpdate(
            id,
            { $pull: { "otherProfiles": { "_id": [new ObjectId(social_id)] } } }
        )

        res.status(201).json({
            status: true,
            message: "Social profile removed."
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = {
    me,
    update,
    updateUsername,
    addWork,
    removeWork,
    addEducation,
    removeEducation,
    addSocial,
    removeSocial
}