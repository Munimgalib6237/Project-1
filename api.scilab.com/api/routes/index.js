
const router = require("express").Router()
const { authRouter } = require("./auth.route")
const { adminRouter } = require("./admin.route")
const { researcherRouter } = require("./researcher.route")
const { publicRouter } = require("./public.route")
const { isAdmin, isResearcher } = require("../middleware/permission.middleware")


router.use("/auth", authRouter)
router.use("/admin", isAdmin, adminRouter)
router.use("/researcher", isResearcher, researcherRouter)
router.use("/public", publicRouter)

module.exports = { router }