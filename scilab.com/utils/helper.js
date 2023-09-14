import jwtDecode from "jwt-decode"

export const arraFromNumber = (number) => {
    const array = []

    for (let i = 0; i < parseInt(number); i++) {
        array.push(i)
    }

    return array
}

// Date to date
export const dateTodate = date => {
    const newDate = new Date(date)

    const day = newDate.getDate()
    const month = newDate.getMonth() + 1
    const year = newDate.getFullYear()
    return `${day}.${month}.${year}`
}

// E-mail valid check
export const isValidEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return regex
}

// Greeting
export const greeting = () => {
    const date = new Date().getHours()
    if (date < 12) {
        return "Good Morning"
    } else if (date < 18) {
        return "Good Afternoon"
    } else {
        return "Good Night"
    }
}

// Valid jwt token
export const isValidToken = async (token) => {
    try {
        const validToken = await jwtDecode(token, { header: true })
        if (validToken) return await jwtDecode(token).name
    } catch (error) {
        if (error) {
            return false
        }
    }
}