const { response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    var role = req.body.role


    User.findOne({$or: [{email:username},{userId:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(err){
                    res.json({
                        error : err
                    })
                }
                if(result){
                    if(role == 'user'){

                        let token = jwt.sign({name: user.name},  'AaBdr(23)', {expiresIn: '1h'})
                        res.json({
                            message: 'Success User',
                            token
                        })
                    }
                    else {
                        let token = jwt.sign({name: user.name},  'AaBdr(23)', {expiresIn: '1h'})
                        res.json({
                            message: 'Success Admin',
                            token
                        })
                    }
                }else{
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}

//Show the list of users
const index = (req, res, next) => {
    User.find()
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
const show = (req, res, next) => {
    let userId = req.body.userId
    User.findById(userId)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(eroor => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//add user 
const adduser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            return res.status(500).json({
                error: 'Error hashing password'
            });
        }

        User.findOne({ email: req.body.email }).then(existingUser => {
            if (existingUser) {
                return res.status(400).json({
                    error: 'Email already exists'
                });
            }

            let user = new User({
                userid: req.body.userid,
                username: req.body.username,
                password: hashedPass,
                fullname: req.body.fullname,
                contact: req.body.contact,
                email: req.body.email,
                role: req.body.role,
                doj: req.body.doj
            });

            user.save()
                .then(response => {
                    res.status(201).json({
                        message: 'User Added Successfully!'
                    });
                })
                .catch(error => {
                    res.status(400).json({
                        error: 'An error occurred while saving user'
                    });
                });
        }).catch(err => {
            res.status(500).json({
                error: 'Database error'
            });
        });
    });
};


//update an user
const update = (req, res, next) => {
    let userId = req.body.userId

    let updateData = {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        contact: req.body.contact,
        email: req.body.email,
        role : req.body.role,
        doj: req.body.doj
    }

    User.findByIdAndUpdate(userId, {$set: updateData})
    .then(() => {
        res.json({
            message: 'User updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete an employee
const destroy = (req, res) => {
    let userid = req.body.userid

    User.findByIdAndDelete(userid)
    .then(() => {
        res.json({
            message: 'User  deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        }+error)
    })
}
const changeField = (req, res) => {
    const userId = req.body.userid;
    const oldField = req.body.contact;
    const newAge = req.body.age;

    // Check if oldField exists in the request
    if (!oldField) {
        return res.status(400).json({
            message: 'Old field not provided'
        });
    }

    // Define the updateData with the new age
    const updateData = { age: newAge };

    // Update the document
    User.findByIdAndUpdate(userId, { $unset: { [oldField]: 1 }, $set: updateData }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            res.json({
                message: 'Field updated successfully!',
                updatedUser
            });
        })
        .catch(error => {
            res.status(400).json({
                message: 'An error occurred while updating field',
                error: error.message
            });
        });
};

module.exports = {
    index, show, adduser, update, destroy, login, changeField
}