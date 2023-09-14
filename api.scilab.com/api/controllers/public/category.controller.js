
const Category = require("../../../models/category.model")

/* list of items */
const index = async (req, res, next) => {
    try {
        const results = await Category.find({}, { title: 1 })

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


module.exports = {
    index
}