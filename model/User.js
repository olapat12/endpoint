const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required:true
    },
    
    surname:{
        type: String,
        //unique: true,
        required: true
    },
   amount:{
       type: Number,
       integer: true
   },
   pin:{
       type: String,
       required: true
   },
    password:{
        type: String
        ,required: true
    
    },
    username:{
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('User', userSchema);
