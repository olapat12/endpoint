const jwt = require('jsonwebtoken')
const {tokensecret} = require('./auth')

function auth (req,res,next){

    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access denied')

    try{

        const verified = jwt.verify(token, tokensecret)
        req.user = verified
        next();
    }catch(err){
        res.status(401).send('Invalid token')
    }
}

module.exports = auth;