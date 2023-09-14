const { isEmpty, isPhone, isEmail } = require("./helper.validator")

/* Register validator */
const register = data => {
    let errors = {}

    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."
    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isEmail(data.email)) errors.email = "Address isn't valid"
    if (!data.phone || isEmpty(data.phone)) errors.phone = "Phone is required."
    if (data.phone && !isPhone(data.phone)) errors.phone = "Phone number isn't valid"
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

    if (!data.email || isEmpty(data.email)) errors.email = "Email is required."
    if (data.email && !isEmail(data.email)) errors.email = "Email address isn't valid"
    if (!data.newPassword || isEmpty(data.newPassword)) errors.newPassword = "New password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}


module.exports = {
    login,
    register,
    reset
}