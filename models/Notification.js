const mongoose = require('mongoose');

//Notification model
const notificationSchema = new mongoose.Schema({
    sellerId:{
        type:Object,
        required:true,
       
    },
    title:{
        type : String,
        required: true,
    },
    message:{
        type : String,
        required: true,
    },
   
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Notifiction',notificationSchema);