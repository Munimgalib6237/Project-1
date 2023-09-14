
const Admin = require("../../../models/admin.model")

/* Logged admin details */
const me = async (req, res, next) => {
    try {
        const { id } = req.user
        const result = await Admin.findById(id, { password: 0 })
            .populate("createdBy", "name email phone role")
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


module.exports = {
    me
}