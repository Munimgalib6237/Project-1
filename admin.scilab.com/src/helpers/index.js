// Phone number valid check
export const isValidPhone = () => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/i
    return regex
}

// E-mail valid check
export const isValidEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return regex
}

// Date to string
export const dateToString = (date) => {
    date = new Date(date)
    return date.toDateString()
}

// Date to date
export const dateTodate = date => {
    date = new Date(date)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
}

// Date to year
export const dateToYear = date => {
    date = new Date(date)
    return date.getFullYear()
}