const router = require("express").Router();
const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');
const ContactBuyer = require('../../models/ContactBuyer');

//Contact Me (Contact buyer details)
router.post('/',buyerToken,async(req,res)=>{
    console.log(req.seller);
//create a new property
    const contactbuyer = new ContactBuyer({
        buyerId:req.buyer,
        name:req.body.name,
        state:req.body.state,
        email:req.body.email,
        mobilenumber:req.body.mobilenumber,
      
        
           
    });
    try{
         const savedUser = await contactbuyer.save();
        res.send({savedUser});
    }catch(err){
        res.status(400).send(err);
    }
  
  

});

module.exports=router;