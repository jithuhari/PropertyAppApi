const router = require("express").Router();
const checkAdminToken = require('../../middelware/SellerAppTokens/AdminCheckToken');
const Seller = require('../../models/Seller');
const bcrypt = require('bcryptjs');
const {sellerregvalidation} = require('../../validation');
const Property = require('../../models/Property');

//view all sellers
router.get('/',checkAdminToken, async(req, res, ) => {
  try{
    const sellers = await Seller.find();
    res.json(sellers);
  }catch(err){
    res.json({message:err});
  }
  
  });

//add new seller
router.post('/',checkAdminToken,async(req,res) => {
//Hide password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);
//validate seller
  const {error} = sellerregvalidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

//checking user is already in the email
  const emailExist = await Seller.findOne({bankemail:req.body.bankemail});

  if(emailExist) return res.status(400).send('Email already existed');
    
//create a new seller
    const seller = new Seller({
      bankname:req.body.bankname,
      branchname:req.body.branchname,
      state:req.body.state,
      district:req.body.district,
      city:req.body.city,
      pincode:req.body.pincode,
      bankemail:req.body.bankemail,
      password:hashedPassword,
  });
  try{
       const savedUser = await seller.save();
      res.send({savedUser});
  }catch(err){
      res.status(400).send(err);
  }


});

//delete seller by id
router.delete('/:sellerId',checkAdminToken,async(req,res)=>{
  try{
 const removedSeller =await Seller.remove({_id:req.params.sellerId});
 res.json(removedSeller);
  }catch(err){
    res.json({message:err});
  }
});


//view all property by admin
router.get('/getall/property',checkAdminToken,async(req,res)=>{
  try{
      const properties = await Property.find();
      res.json(properties);
  }catch(err){
      res.json({message:err})
  }
});
module.exports = router;