const { isEmpty, isEmail } = require("./helper.validator")

/* Register validator */
const register = data => {
    let errors = {}

    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."
    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isEmail(data.email)) errors.email = "Address isn't valid"
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* Login validator */
const login = data => {
    let errors = {}

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isEmail(data.email)) errors.email = "Address isn't valid"
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* Reset */
const reset = data => {
    let errors = {}

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isEmail(data.email)) errors.email = "Address isn't valid"

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* Add work */
const addWork = data => {
    let errors = {}

    if (!data.organization || isEmpty(data.organization)) errors.organization = "Organization is required."
    if (!data.department || isEmpty(data.department)) errors.department = "Department is required."
    if (!data.position || isEmpty(data.position)) errors.position = "Position is required."
    if (!data.startFrom || isEmpty(data.startFrom)) errors.startFrom = "Start from date is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* Add education */
const addEducation = data => {
    let errors = {}

    if (!data.school || isEmpty(data.school)) errors.school = "School is required."
    if (!data.department || isEmpty(data.department)) errors.department = "Department is required."
    if (!data.passingYear || isEmpty(data.passingYear)) errors.passingYear = "Passing year is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* Add social */
const addSocial = data => {
    let errors = {}

    if (!data.title || isEmpty(data.title)) errors.title = "Title is required."
    if (!data.link || isEmpty(data.link)) errors.link = "Link is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}


module.exports = {
    login,
    register,
    reset,
    addWork,
    addEducation,
    addSocial
}