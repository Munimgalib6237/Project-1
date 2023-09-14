
const publicRouter = require("express").Router()
const category = require("../controllers/public/category.controller")
const researcher = require("../controllers/public/researcher.controller")


/* Public routes */
publicRouter.get("/category", category.index)
publicRouter.get("/researcher", researcher.index)
publicRouter.get("/researcher/:username", researcher.show)
publicRouter.get("/researcher/search/profile", researcher.searchProfile)
publicRouter.get("/researcher/publications/:username", researcher.publications)

module.exports = {
    publicRouter
}

