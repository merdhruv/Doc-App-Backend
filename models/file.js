const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    Doc_code: {
        type: Number
    },
    sender : {
        type: String
    },
    recipient : {
        type: String
    }, 
    category:{
        type : String
    },
    priortization : {
        type : String
    },
    description:{
        type : String
    },
    filename:{
        type:String
    }

}, {timestamps: true})

const File = mongoose.model('File', fileSchema)
module.exports = File