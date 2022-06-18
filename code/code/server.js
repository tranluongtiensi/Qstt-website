const express = require('express')
const User = require ('./model/user')
const bodyParser = require('body-parser')
const cookie = require ('cookie-parser')
const loggedin = require ('./controllers/loggedin')
const page  = require ('./routers/page')
const auth = require ('./controllers/auth')
const app = express()
const port =3000


app.use(express.static('./public/asset'))
app.use('/js', express.static('./public/js'))
app.set('view engine', 'ejs')
app.use(cookie())
app.use(bodyParser.json())


User.connect((err) => {
    if (err) throw err
    console.log("database connected")
})
app.use('/', page )
app.use('/api', auth)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })