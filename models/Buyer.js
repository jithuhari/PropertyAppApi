const mongoose = require('mongoose');

//Buyer model
const buyerSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    resetToken:String,
    expireToken:Date,
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Buyer',buyerSchema);