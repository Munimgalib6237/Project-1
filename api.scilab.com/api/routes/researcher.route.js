
const researcherRouter = require("express").Router()
const profile = require("../controllers/researcher/profile.controller")
const publication = require("../controllers/researcher/publication.controller")


/* Profile routes */
researcherRouter.get("/profile/me", profile.me)
researcherRouter.put("/profile/update", profile.update)
researcherRouter.put("/profile/update-username", profile.updateUsername)
researcherRouter.put("/profile/add-work", profile.addWork)
researcherRouter.delete("/profile/remove-work/:work_id", profile.removeWork)
researcherRouter.put("/profile/add-education", profile.addEducation)
researcherRouter.delete("/profile/remove-education/:education_id", profile.removeEducation)
researcherRouter.put("/profile/add-social", profile.addSocial)
researcherRouter.delete("/profile/remove-social/:social_id", profile.removeSocial)

/* Publication routes */
researcherRouter.get("/publication", publication.index)
researcherRouter.get("/publication/:id", publication.show)
researcherRouter.post("/publication", publication.store)
researcherRouter.put("/publication/:id", publication.update)
researcherRouter.delete("/publication/:id", publication.destroy)
researcherRouter.get("/category", publication.categoryItems)

module.exports = {
    researcherRouter
}

