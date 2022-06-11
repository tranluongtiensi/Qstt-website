  const mongoose = require ('mongoose')
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    password_confirmation: {type: String, required: true},
    phone: {type: String, required: true}
  },{ collection: 'users'}
  )

  const model = mongoose.model('UserSchema', UserSchema);

  module.exports = model

