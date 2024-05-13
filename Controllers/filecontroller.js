const { response } = require('express')
const File = require('../models/file')

//Show the list of users
const indexfile = (req, res, next) => {
    File.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//show single user by id
const showfile = (req, res, next) => {
    let fileId = req.body.filename
    File.findById(fileId)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//add file 
const addfile = (req, res, next) =>{
    let file = new File({
        Doc_code: req.body.Doc_code,
        sender: req.body.sender,
        recipient: req.body.recipient,
        category: req.body.category,
        priortization: req.body.priortization,
        description: req.body.description,
        filename : req.files ? req.files[0].originalname : '',
    })
    if(req.file){
        file.avatar = req.file.path
    }
    file.save()
    .then(res => {
        res.json({
            message: 'file Added Succesfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//update an user
const updatefile = (req, res, next) => {
    let Doc_code = req.body.Doc_code
    
    let updateData = {
        sender: req.body.sender,
        recipient: req.body.recipient,
        category: req.body.category,
        priortization: req.body.priortization,
        description: req.body.description
    }

    File.findByIdAndUpdate(Doc_code, {$set: updateData})
    .then(() => {
        res.json({
            message: 'file updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete an employee
const destroyfile = (req, res, next) => {
    let Doc_code = req.body.Doc_code

    File.findByIdAndDelete(Doc_code)
    .then(() => {
        res.json({
            message: 'file  deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

module.exports = {
    indexfile, showfile, addfile, updatefile, destroyfile
}