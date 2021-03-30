const router = require('express').Router();
const Seller = require('../../models/Seller');
const checkSellerToken =require('../../middelware/SellerAppTokens/SellerCheckToken');
const {sellerloginvalidation} = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Login seller
router.post('/login',async(req,res)=>{
   
//validate seller
   const {error} = sellerloginvalidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

//checking if the email exist
   const seller = await Seller.findOne({bankemail:req.body.bankemail});
   if(!seller) return res.status(400).send('Email incorrect');

//password is incorrect
   const validPass = await bcrypt.compare(req.body.password,seller.password);
   if (!validPass) return res.status(400).send('invalid password');

//create and assign a token(header)
   // const token = jwt.sign({_id: seller._id},process.env.TOKEN_SELLER);
   // res.header('seller-token', token).send(token);
 //  Cookie

 const sellertoken = jwt.sign({
   sellerid: seller._id
 }, process.env.TOKEN_SELLER,
  )
 res.cookie('sellertoken', sellertoken, { maxAge: 3600 })
 console.log(sellertoken);
 res.status(200).json({ message: 'Login successful', sellertokendata: sellertoken })
 res.end()
/* res.send("logged in"); */



// res.send("logged in");
});

//Seller (profile) update
router.patch('/:sellId',checkSellerToken,async(req,res) =>{
//Hide password
   const salt = await bcrypt.genSalt(10);
   // const hashedPassword = await bcrypt.hash(req.body.password,salt);
   try{
      const updatedSeller = await Seller.updateOne(
         {_id:req.params.sellId},
         {$set:{bankname:req.body.bankname,
            branchname:req.body.branchname,
            state:req.body.state,
            district:req.body.district,
            city:req.body.city,
            pincode:req.body.pincode,
            bankemail:req.body.bankemail,
            // password:hashedPassword,

            
         }},
         
      );
      res.json(updatedSeller);
   }catch(err){
      res.json({message:err});
   }

});

//seller logout

router.get('/logout', (req, res)=>{
   res.clearCookie('sellertoken');
   res.send('Logout Successfully');
});


module.exports=router;