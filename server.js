const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config();

const UserRoute = require('./routes/Userroutes')
const FileRoute = require('./routes/Userfileroutes')

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
}) 

app.use('/api/user', UserRoute)
app.use('/api/file', FileRoute)