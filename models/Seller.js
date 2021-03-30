const mongoose = require('mongoose');

//Seller model
const sellerSchema = new mongoose.Schema({
    bankname:{
        type : String,
        required: true,
    },
    branchname:{
        type:String,
        required:true,
       
    },
    state:{
        type : String,
        required: true,
    },
    district:{
        type:String,
        required:true,
       
    },
    city:{
        type : String,
        required: true,
    },
    pincode:{
        type:String,
        required:true,
       
    },
    bankemail:{
        type:String,
        required:true,
       
    },
    password:{
        type:String,
        required:true,
       
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Seller',sellerSchema);