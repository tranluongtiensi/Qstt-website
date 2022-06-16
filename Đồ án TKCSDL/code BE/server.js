const express = require('express')
const path = require ('path')
const User = require ('./model/user')
const bodyParser = require('body-parser')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const port =3000

const app = express()
app.use('/', express.static(path.join(__dirname, '../code FE/')))
app.use(bodyParser.json())

User.connect((err) => {
    if (err) throw err
    console.log("database connected")
})

// app.post('/api/change-password', (req, res) => {
//   const { token } = req.body
//   const user = jwt.verify(token, JWT_SECRET)
//   console.log()
// })
// || !await bcrypt.compare(password, result[0].password

app.post('/signin', (req, res) => {
    const { username, password } = req.body
    if (!password || !username) {
      return res.json({status: 'error', error: 'Invalid username/ password'})
    }
    else {  
      User.query('SELECT username, password FROM users WHERE username = ?', [username], async (error, result) => {
        if (error) throw error
        if ( !result[0] || !await bcrypt.compare('password', result[0].password)) {

          return res.json({status: 'error', error: 'Incorrect username or password'}) }
        else {
          const token = jwt.sign({
            id: result[0].id, 
            username: result[0].username
          },
          process.env.JWT_SECRET,{
          expiresIn: process.env.JWT_EXPIRES
          // httpOnly: true
          })
          const cookie_option = {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES *24 *60 *60 *1000),
            httpOnly: true
          }
          res.cookie('user Register', token, cookie_option)
          return res.json({status: 'ok', success: 'user has been logged in', data: token})
        }
      })
    }
  })

app.post('/register', async (req, res) => {
    const { username, password: plainTextPassword, password_confirmation: someOtherPlaintextPassword, phone} = req.body
    if (!username || typeof username !== 'string') {
       return res.json({ status: 'error', error: 'Invalid username'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
       return res.json({ status: 'error', error: 'Invalid password'})
    }
    User.query('SELECT username FROM users WHERE username = ?', [username], async (error, result) => {
        if (error) throw error
        if (result[0]) return res.json({status: 'error', error: 'user already in use'})
        else {
            const password = await bcrypt.hash('password', 10)
            const password_confirmation = await bcrypt.hash('password_confirmation', 10)
            post = {username: username, password: password, password_confirmation: password_confirmation, phone: phone}
            User.query('INSERT INTO users SET ?', post, (error, result) => {
                if (error) throw error
                return res.json ({status: 'ok'})
            })     
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })
