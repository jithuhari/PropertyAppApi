const mongoose = require('mongoose');

//Property model
const propertySchema = new mongoose.Schema({
    sellerId:{
        type:Object,
        required:true,
       
    },
    favorite:{
        type:Boolean,
        required:true,
       
    },
    bidlist:{
        type:Boolean,
        required:true,
       
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
        type:String,
        required:true,
       
    },
    pincode:{
        type:String,
        required:true,
       
    },
    reservedprice:{
        type : String,
        required: true,
    },
    emdrs:{
        type:String,
        required:true,
       
    },
    emdlastdate:{
        type:Date,
        required: true,
    },
    borrowename:{
        type:String,
        required:true,
       
    },
    ownername:{
        type:String,
        required:true,
       
    },
    ownershiptype:{
        type:String,
        required:true,
       
    },
    summarydescription:{
        type:String,
        required:true,
       
    },
    propertytype:{
        type:String,
        required:true,
       
    },
    propertysubtype:{
        type:String,
        required:true,
       
    },
    typeoftitledeep:{
        type:String,
        required:true,
       
    },
   
    
    statusofpossession:{
        type:String,
        required:true,
       
    },
    auctionopendate:{
        type:Date,
        required:true,
       
    },
    auctionclosedate:{
        type:Date,
        required:true,
        
    },
    scaledbidlastdate:{
        type:Date,
        required:true,
       
    },
    scaledbidextendeddate:{
        type:Date,
        required:true,
       
    },
    address:{
        type:String,
        required:true,
       
    },
    nearestairportstand:{
        type:String,
        required:true,
       
    },
    propertyDocuments:{
        type:String,
        required:true,
       
    },
   
    
    date:{
        type:Date,
        default:Date.now,
    }

});
module.exports=mongoose.model('Property',propertySchema);