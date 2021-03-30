const mongoose = require('mongoose');

//Admin model
const adminSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Admin',adminSchema);