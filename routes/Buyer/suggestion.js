const router = require("express").Router();
const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');
const Suggestion = require('../../models/Suggestion');

//Suggestion  Add
router.post('/',buyerToken,async(req,res)=>{
    console.log(req.buyer);
//create a new property
    const suggestion = new Suggestion({
        buyerId:req.buyer,
        name:req.body.name,
        state:req.body.state,
        email:req.body.email,
        mobilenumber:req.body.mobilenumber,
        suggestions: req.body.suggestions,
      
        
           
    });
    try{
         const savedUser = await suggestion.save();
        res.send({savedUser});
    }catch(err){
        res.status(400).send(err);
    }
  
  

});


module.exports=router;