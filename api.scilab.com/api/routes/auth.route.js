
const authRouter = require("express").Router()
const adminAuth = require("../controllers/auth/admin.controller")
const researcherAuth = require("../controllers/auth/researcher.controller")

/* Admin auth routes */
authRouter.post("/admin/login", adminAuth.login)
authRouter.post("/admin/reset", adminAuth.reset)

/* Researcher auth routes */
authRouter.post("/researcher/register", researcherAuth.register)
authRouter.post("/researcher/login", researcherAuth.login)
authRouter.post("/researcher/reset", researcherAuth.reset)


module.exports = {
    authRouter
}