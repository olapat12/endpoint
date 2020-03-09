const router = require('express').Router();
const auth = require('./verifyToken')
const User = require('../model/User')

router.get('/home',auth, (req,res)=>{
    // res.send(req.user.id)

    // fetching user info from jwt
     User.findOne({_id : req.user.id})
     .then(function(user){
         res.send(user)
     })
   //  var userId = decoded.id;
     // Fetch the user by id 
     //User.findOne({_id: userId}).then(function(user)

})

module.exports = router;