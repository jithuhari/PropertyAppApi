const router = require("express").Router();
const checkSellerToken = require('../../middelware/SellerAppTokens/SellerCheckToken');
const ContactBuyer = require('../../models/ContactBuyer');

//view all sellers
router.get('/',checkSellerToken, async(req, res, ) => {
    try{
      const contactBuyer = await ContactBuyer.find();
      res.json(contactBuyer);
    }catch(err){
      res.json({message:err});
    }
    
    });

module.exports = router;   
  