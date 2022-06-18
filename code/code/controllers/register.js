const bcrypt = require ('bcryptjs')
const User = require('../model/user')

const register = async (req, res) => {
      const { username, password: plainTextPassword, password_confirmation: someOtherPlaintextPassword, phone} = req.body

      if (!username || typeof username !== 'string') {
         return res.json({ status: 'error', error: 'Invalid username'})
      }
      if (!plainTextPassword || typeof someOtherPlaintextPassword !== 'string') {
         return res.json({ status: 'error', error: 'Invalid password'})
      }
      User.query('SELECT * FROM users WHERE username = ?', [username], async (error, result) => {

          if (error) throw error
          if (result[0]) {
            const validPassword = await bcrypt.compare(plainTextPassword, result[0].password) 
            const validPasswordConfirmation =  await bcrypt.compare(someOtherPlaintextPassword, result[0].password_confirmation)
            /* compare the password confirmation, password and phone number if it 
            is the same as the password, password confirmation, phone number stored in mysql.
            If it's the same then show message "user already in use please login"
            */
            if ( validPassword && validPasswordConfirmation && phone == result[0].phone) {
              return res.json({status: 'ok', success: 'user already in use please login'})
            }
            if (phone != result[0].phone){
  
              return res.json({status: 'error', error: 'username is already in use, please enter another username'})
            }
            else{
              return res.json({status:'error', error: 'username is already in use, please enter another username'})
            }
          }
          else {
              const password = await bcrypt.hash(plainTextPassword, 10)
              const password_confirmation = await bcrypt.hash(someOtherPlaintextPassword, 10)
              post = {username: username, password: password, password_confirmation: password_confirmation, phone: phone}
              User.query('INSERT INTO users SET ?', post, (error, result) => {
                  if (error) throw error
                  return res.json ({status: 'ok'})
              })     
          }
      })
  }

  module.exports = register