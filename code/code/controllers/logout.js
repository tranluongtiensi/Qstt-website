const logout = (req, res) => {
    res.clearCookie('userRegister')
    res.redirect('/home')
}
module.exports = logout
