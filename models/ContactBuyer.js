const mongoose = require('mongoose');

//ContactBuyer model
const ContactBuyerSchema = new mongoose.Schema({
    buyerId:{
        type:Object,
        required:true,
       
    },
    name:{
        type:String,
        required:true,
       
    },
   
    email:{
        type : String,
        required: true,
    },
    mobilenumber:{
        type:String,
        required:true,
        min:10,
    },
   
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('ContactBuyer',ContactBuyerSchema);