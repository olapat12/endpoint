const Joi = require('@hapi/joi')

// validating user registration
const registerValidation = data =>{
    const schema = {
        firstname : Joi.string().min(3).required(),
        email : Joi.string().min(7).required().email(),
        secondname : Joi.string().min(4).required(),
        surname: Joi.string().min(4).required()
    } 
    return Joi.validate(data, schema)
}


const loginValidation = data =>{
    const schema = {
        username : Joi.string().min(3).required(),
        password : Joi.string().min(4).required()
    } 
    return Joi.validate(data, schema) 
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
