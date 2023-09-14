
const Category = require("../../../models/category.model")
const Researcher = require("../../../models/researcher.model")
const Publication = require("../../../models/publication.model")

/* Dashboard index */
const index = async (req, res, next) => {
    try {
        const categoryTotal = await Category.countDocuments()
        const researcherTotal = await Researcher.countDocuments()
        const publicationTotal = await Publication.countDocuments()

        res.status(200).json({
            status: true,
            data: {
                category: categoryTotal,
                researcher: researcherTotal,
                publication: publicationTotal
            }
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