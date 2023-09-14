const { isEmpty } = require("./helper.validator")

/* Store validator */
const store = data => {
    let errors = {}

    if (!data.title || isEmpty(data.title)) errors.title = "Title is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}


module.exports = {
    store
}