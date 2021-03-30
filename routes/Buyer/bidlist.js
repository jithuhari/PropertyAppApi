const router = require("express").Router();
const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');
const Property = require('../../models/Property');

//bidlist property list
router.get('/',buyerToken, async(req, res, ) => {
  
    try{
      const favorites = await Property.find({bidlist : true});
      
      res.json(favorites);
    }catch(err){
      res.json({message:err});
    }
    
    });
module.exports=router;