const User = require('../Models/User')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = await User.findById(decoded.id)
            next()
        } catch (error) {
            res.status(401).json({ Msg: 'you are not authorized to access this link', success: false })
        }
    }
    if (!token) {
        res.status(401).json({ Msg: 'No Token ,you are not authorized to access this link', success: false })
    }
}
const admin = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'super_admin')) {
        next()
    } else {
        res.status(401).json({ Msg: 'Only an Admin have access to that link', success: false })

    }
}
const superAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        next()
    } else {
        res.status(401).json({ Msg: 'Only a Super Admin have access to that link', success: false })

    }
}
module.exports = { admin, protect, superAdmin }

