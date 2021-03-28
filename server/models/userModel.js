const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    confirmPassword : String,
    id : String
})

const USERMODEL = mongoose.model('USERMODEL',userSchema)

module.exports = USERMODEL
