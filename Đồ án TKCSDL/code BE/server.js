const express = require('express')
const path = require ('path')
const mongoose = require ('mongoose')
const User = require ('./model/user')
const bodyParser = require('body-parser')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const JWT_SECRET = 'lkjlfg%nlnkllkj@R%#@%@&bgkj3nskk2cnklvdfsflkjlkjf98748'
const port =3000

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const app = express()
app.use('/', express.static(path.join(__dirname, '../code FE/')))
app.use(bodyParser.json())

// app.post('/api/change-password', (req, res) => {
//   const { token } = req.body
//   const user = jwt.verify(token, JWT_SECRET)
//   console.log()
// })

app.post('/signin', async (req, res) => {
  const { username, password: plainTextPassword } = req.body
  const user = await User.findOne({ username }).lean()
  if (!user) {
    return res.json({status: 'error', error: 'Invalid username/password'})
  }
  
  if (await bcrypt.compare('password', user.password)) {
    // the username, password combination is successfully
    const token = jwt.sign({ 
      id: user._id, 
      username: user.username
    },
    JWT_SECRET
    )
    return res.json({status: 'ok', data: token})
  }
  return res.json({status: 'error', error: 'Invalid username/password'})
 })
app.post('/register', async (req, res) => {
    const { username, password: plainTextPassword, password_confirmation: someOtherPlaintextPassword, phone} = req.body
    if (!username || typeof username !== 'string') {
      return res.json({ status: 'error', error: 'Invalid username'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
      return res.json({ status: 'error', error: 'Invalid password'})
    }
    const password = await bcrypt.hash('password', 10)
    const password_confirmation = await bcrypt.hash('password_confirmation', 10)
    try {
      const response = await User.create({
        username,
        password,
        password_confirmation,
        phone
      })
      console.log('user created successfully: ', response)
    }catch(error){
      if (error.code === 11000) {
        return res.json({ status: 'error', error: 'username already in use'})
      }
      throw error
    }
    res.json({status: 'ok'})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })
