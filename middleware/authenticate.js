const jwt =require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try{

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'AaBdr(23)')

        req.user = decode
        next()
    }
    catch(error) {
        res.json({
            message: 'Authenticate failed!'
        })
    }
}

module.exports = authenticate