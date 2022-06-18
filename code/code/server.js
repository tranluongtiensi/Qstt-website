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
// app.set('views', './views')
app.use(cookie())
app.use(bodyParser.json())


User.connect((err) => {
    if (err) throw err
    console.log("database connected")
})
app.use('/', page )
app.use('/api', auth)
// // app.post('/api/change-password', (req, res) => {
// //   const { token } = req.body
// //   const user = jwt.verify(token, JWT_SECRET)
// //   console.log()
// // })

// app.post('/signin', (req, res) => {
//     const { username, password: plainTextPassword} = req.body
//     //no value entered
//     if (!plainTextPassword || !username) {
//       return res.json({status: 'error', error: 'Invalid username/ password'})
//     }
//     else {  
//       User.query('SELECT * FROM users WHERE username = ?', [username], async (error, result) => {
//         if (error) throw error
//         const validPassword = await bcrypt.compare(plainTextPassword, result[0].password)
//         console.log(validPassword)
//         //enter wrong username or password 
//         if ( !result[0] || !validPassword) {
//           return res.json({status: 'error', error: 'Incorrect username or password'}) }
//         //In case the username, password is entered correctly
//         else {
//           const token = jwt.sign({
//             id: result[0].id, 
//             username: result[0].username
//           },
//           process.env.JWT_SECRET,{
//           expiresIn: process.env.JWT_EXPIRES
//           })
//           const cookie_option = {
//             expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES *24 *60 *60 *1000),
//             httpOnly: true,
//             secure: false
//           }
//           res.cookie('userRegister', token, cookie_option)
//           return res.json({status: 'ok', success: 'user has been logged in', data: token})
//         }
//       })
//     }
//   })

// app.post('/register', async (req, res) => {
//     const { username, password: plainTextPassword, password_confirmation: someOtherPlaintextPassword, phone} = req.body
//     if (!username || typeof username !== 'string') {
//        return res.json({ status: 'error', error: 'Invalid username'})
//     }
//     if (!plainTextPassword || typeof someOtherPlaintextPassword !== 'string') {
//        return res.json({ status: 'error', error: 'Invalid password'})
//     }
//     User.query('SELECT * FROM users WHERE username = ?', [username], async (error, result) => {

//         if (error) throw error
//         if (result[0]) {
//           const validPassword = await bcrypt.compare(plainTextPassword, result[0].password) 
//           const validPasswordConfirmation =  await bcrypt.compare(someOtherPlaintextPassword, result[0].password_confirmation)
//           /* compare the password confirmation, password and phone number if it 
//           is the same as the password, password confirmation, phone number stored in mysql.
//           If it's the same then show message "user already in use please login"
//           */
//           if ( validPassword && validPasswordConfirmation && phone == result[0].phone) {
//             return res.json({status: 'ok', error: 'user already in use please login'})
//           }
//           if (phone != result[0].phone){

//             return res.json({status: 'error', error: 'username is already in use, please enter another username'})
//           }
//           else{
//             return res.json({status:'error', error: 'username is already in use, please enter another username'})
//           }
//         }
//         else {
//             const password = await bcrypt.hash(plainTextPassword, 10)
//             const password_confirmation = await bcrypt.hash(someOtherPlaintextPassword, 10)
//             post = {username: username, password: password, password_confirmation: password_confirmation, phone: phone}
//             User.query('INSERT INTO users SET ?', post, (error, result) => {
//                 if (error) throw error
//                 return res.json ({status: 'ok'})
//             })     
//         }
//     })
// })

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })