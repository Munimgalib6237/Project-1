const { isEmpty } = require("./helper.validator")

/* Store validator */
const store = data => {
    let errors = {}

    if (!data.category || isEmpty(data.category)) errors.category = "Category Id is required."
    if (!data.title || isEmpty(data.title)) errors.title = "Title is required."
    if (!data.authors || isEmpty(data.authors)) errors.authors = "Authors is required."
    if (!data.publicationDate || isEmpty(data.publicationDate)) errors.publicationDate = "Publication date is required."
    if (!data.conference || isEmpty(data.conference)) errors.conference = "Conference name is required."
    if (!data.publisher || isEmpty(data.publisher)) errors.publisher = "Publisher is required."
    if (!data.description || isEmpty(data.description)) errors.description = "Description is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}


module.exports = {
    store
}