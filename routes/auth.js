const router = require('express').Router();
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const {registerValidation, loginValidation} = require('./validation')
const bcrypt = require('bcryptjs')


const tokensecret = 'ttegdfffdhhsdsffffnpm'

router.post('/reg', async(req, res)=>{

    // const {error}  = registerValidation(req.body)
   

    // if(error) return res.status(400).send(error);
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        surname: req.body.surname,
        password: hashPassword,
        amount: req.body.amount,
        pin: req.body.pin

        })
        try{    
            // persisting the user data into the database
        const savedUser = await user.save();
        res.status(200).send(savedUser)

    }catch(err){
        res.status(400).send(err)
    }
})

// saving new user into the database




router.post('/login', async (req,res)=>{

    const {error}  = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    // checking if username exist
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('username and password does not match');

    // checking if the password and username match
    const validPassword = await bcrypt.compare(req.body.password, user.password); 
    if(!validPassword) return res.status(401).send('invalid password')

    const payload = {
        id: user._id,
        amount: user.amount
    }
    const token = jwt.sign(payload, tokensecret)
   //let authToken = token
    res.json({"authToken": token,"payload":payload });

    // create and assign token


    //res.send('logged in')

})

router.get('/balance/:username', async (req,res)=>{

    const user = await User.findOne({username: req.params.username});

    if(user) return res.status(200).send(user);
    return res.status(400).send('thief')
})

// to update user info
const  Update = (req, res) => {

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params._id, {
        amount: req.body.amount ,
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
    });
};

router.put('/update/:_id',Update)

// to delete a user via user_id
const Delete = (req, res) => {
    User.findByIdAndRemove(req.params._id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params._id
            });                
        }
    });
};

//get all users
 const findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

router.get('/list', findAll)

router.delete('/remove/:_id', Delete)




module.exports= router;
module.exports.tokensecret = tokensecret;