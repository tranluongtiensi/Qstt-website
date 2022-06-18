const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const dotenv = require('dotenv')

const login =  (req, res) => {
    const { username, password: plainTextPassword} = req.body
    //no value entered
    if (!plainTextPassword || !username) {
      return res.json({status: 'error', error: 'Invalid username/ password'})
    }
    else {  
      User.query('SELECT * FROM users WHERE username = ?', [username], async (error, result) => {
        if (error) throw error
        const validPassword = await bcrypt.compare(plainTextPassword, result[0].password)
        console.log(validPassword)
        //enter wrong username or password 
        if ( !result[0] || !validPassword) {
          return res.json({status: 'error', error: 'Incorrect username or password'}) }
        //In case the username, password is entered correctly
        else {
          const token = jwt.sign({
            id: result[0].id, 
            username: result[0].username
          },
          process.env.JWT_SECRET,{
          expiresIn: process.env.JWT_EXPIRES
          })
          const cookie_option = {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES *24 *60 *60 *1000),
            httpOnly: true,
            secure: false
          }
          res.cookie('userRegister', token, cookie_option)
          return res.json({status: 'ok', success: 'user has been logged in', data: token})
        }
      })
    }
  }
  module.exports = login