const jwt = require("jsonwebtoken")

// Amin permission
const isAdmin = async (req, res, next) => {
    try {
        const token = await req.headers.authorization
        if (!token) return res.status(404).json({ message: 'Token not found' })

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, process.env.JWT_SECRET)

        if (decode.role !== "Super admin") {
            return res.status(410).json({ message: 'You have no permission to access.' })
        }

        req.user = decode

        next()
    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'Unauthorized request' })
        }
    }
}

/* Researcher permission */
const isResearcher = async (req, res, next) => {
    try {
        const token = await req.headers.authorization
        if (!token) return res.status(404).json({ message: 'Token not found' })

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, process.env.JWT_SECRET)

        if (decode.role !== "Researcher") {
            return res.status(410).json({ message: 'You have no permission to access.' })
        }

        req.user = decode

        next()
    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }
            return res.status(501).json({ message: 'Unauthorized request' })
        }
    }
}


module.exports = {
    isAdmin,
    isResearcher
}