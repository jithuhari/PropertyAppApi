const mongoose = require('mongoose');

//Suggestion model
const SuggestionSchema = new mongoose.Schema({
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
    suggestions:{
        type:String,
        required:true,
      
    },
   
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports=mongoose.model('Suggestion',SuggestionSchema);