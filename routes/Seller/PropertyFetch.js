const router = require("express").Router();

const checkSellerToken =require('../../middelware/SellerAppTokens/SellerCheckToken');
const Property = require('../../models/Property');
// Fetch specific Seller property
router.get('/:sellId',checkSellerToken,async(req,res)=>{
    try{

  const sellId =  req.params.sellId
  console.log(req.params.sellId);
  const notification = await  Property.find({sellerId:sellId});
    res.json(notification);
}catch(err){
    res.json({message:err}); 
}
});


module.exports=router;