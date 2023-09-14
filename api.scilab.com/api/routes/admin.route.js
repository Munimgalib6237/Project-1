const adminRouter = require("express").Router()

const account = require("../controllers/admin/account.controller")
const dashboard = require("../controllers/admin/dashboard.controller")
const category = require("../controllers/admin/category.controller")
const researcher = require("../controllers/admin/researcher.controller")
const publication = require("../controllers/admin/publication.controller")
const admin = require("../controllers/admin/admin.controller")

/* Account routes */
adminRouter.get("/account", account.me)

/* Dashboard routes */
adminRouter.get("/dashboard", dashboard.index)

/* Category routes */
adminRouter.get("/category", category.index)
adminRouter.get("/category/:id", category.show)
adminRouter.post("/category", category.store)
adminRouter.put("/category/:id", category.update)
adminRouter.delete("/category/:id", category.destroy)

/* Researcher routes */
adminRouter.get("/researcher", researcher.index)
adminRouter.get("/researcher/:id", researcher.show)
adminRouter.get("/researcher/publications/:id", researcher.publications)

/* Publication routes */
adminRouter.get("/publication", publication.index)
adminRouter.put("/publication/:id", publication.update)


/* Admin routes */
adminRouter.get("/admin", admin.index)
adminRouter.post("/admin", admin.store)
adminRouter.delete("/admin/:id", admin.destroy)


module.exports = {
    adminRouter
}

