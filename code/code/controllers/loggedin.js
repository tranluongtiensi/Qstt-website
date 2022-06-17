const User = require ('../model/user')
const jwt = require ('jsonwebtoken')
const loggedin = (req, res, next) => {
    if (!req.cookies.userRegister ) return next()
    try {
        const decode = jwt.verify(req.cookies.userRegister, process.env.JWT_SECRET)
        User.query ('SELECT * FROM users where id = ?', [decode.id], (error, result) => {
            if (error) return next()
            req.user = result[0]
            return next()
        })
    } catch (error) {
        if(err) return next()
    }
}
module.exports = loggedin