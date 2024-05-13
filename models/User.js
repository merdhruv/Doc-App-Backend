const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userid : {
        type: Number
    },
    username : {
        type : String
    },
    password:{
        type : String
    },
    fullname:{
        type : String
    },
    contact:{
        type : Number
    },
    email:{
        type: String
    },
    role:{
        type: String
    },
    doj:{
        type: Date
    }

}, {timestamps: true})

const User = mongoose.model('User', userSchema)

User.updateMany({},{$unset : {"contact":""}})

module.exports = User