const mongoose = require('mongoose');

//Property model
const PersonalDetailSchema = new mongoose.Schema({
    buyerId:{
        type:Object,
        required:true,
       
    },
    ProfilePicture:{
        type:String,
        required:true,
       
    },
    firstname:{
        type:String,
        required:true,
       
    },
    lastname:{
        type : String,
        required: true,
    },
    displayname:{
        type:String,
        required:true,
       
    },
    dateofbirth:{
        type:Date,
        required:true,
       
    },
    country:{
        type:String,
        required:true,
       
    },
    mobilenumber:{
        type : String,
        required: true,
    },
    permanentaddress:{
        type:String,
        required:true,
       
    },
    pincode:{
        type:String,
        required: true,
    },
    city:{
        type:String,
        required:true,
       
    },
  
    
    date:{
        type:Date,
        default:Date.now,
    }

});
module.exports=mongoose.model('PersonalDetail',PersonalDetailSchema);