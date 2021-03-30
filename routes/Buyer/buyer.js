const router = require("express").Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Buyer = require('../../models/Buyer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const {buyerregvalidation,buyerloginvalidation} = require('../../buyervalidation');
const jwt = require('jsonwebtoken');
const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');

//buyer api
//buyer registration
router.post('/register',async(req,res) => {
    //Hide password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
    // //validate buyer
      const {error} = buyerregvalidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
    
    //checking user is already in the email
      const emailExist = await Buyer.findOne({email:req.body.email});
    
      if(emailExist) return res.status(400).send('Email already existed');
        
    //create a new seller
        const buyer = new Buyer({
          email:req.body.email,
          password:hashedPassword,
      });
      try{
           const savedUser = await buyer.save();
          res.send({savedUser});
      }catch(err){
          res.status(400).send(err);
      }
    
    
    });

    //Buyer Login
router.post('/login',async (req,res)=>{

    //validate user
        const {error} = buyerloginvalidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
    //checking if the email exist
        const buyer = await Buyer.findOne({email:req.body.email});
        if(!buyer) return res.status(400).send('Email incorrect');
    
    //password is incorrect
        const validPass = await bcrypt.compare(req.body.password,buyer.password);
        if (!validPass) return res.status(400).send('invalid password');
    
    
  
    
      //  Cookie
    
        const buyertoken = jwt.sign({
            Buyerid: buyer._id
          }, process.env.TOKEN_BUYER,
            )
          res.cookie('buyertoken', buyertoken, { maxAge: 3600 })
       
          res.status(200).json({ message: 'Login successful', buyertokendata: buyertoken })
          res.end()
    // /* res.send("logged in"); */
    
    });
// Change password Buyer

router.patch('/changepassword',buyerToken, (req, res, next) => {
  try{
     console.log(req.cookies.buyertoken)
     const decoded = jwt.verify(req.cookies.buyertoken, process.env.TOKEN_BUYER)
 
     const id = decoded.Buyerid;
    //  console.log(buyer._id);
    // console.log('decode:' + decoded )
    Buyer.findOne({ _id: id })
       .exec()
       .then(user => {
        //  console.log('user is: ' + user.name)
         bcrypt.compare(req.body.oldpassword, user.password, (err, result) => {
       
           if (result) {
             if (req.body.newpassword == req.body.confirmpassword) {
 
               bcrypt.hash(req.body.confirmpassword, 10, (err, hash) => {
                 if (err) {
                   return res.status(500).json({
                     error: err
                   });
                 } else {
 
                  Buyer.updateOne({ _id: id }, { $set: { password: hash } })
                     .exec()
                     .then(result => {
                       console.log('Buyer password updated');
                       res.status(200).json({
                         message : 'Buyer password updated '
                       })
                     })
                     .catch(err => {
                       console.log(err);
                       res.status(500).json({
                         error: err
                       })
                     })
                 }
               })
 
             }
             else {
               res.status(500).json({
                 error: err,
                 message : 'please check your new password and confirm password!!'
               })
             }
           }
           else {
             res.status(500).json({
               error: err,
               message : 'please enter your old password correctly'
             })
           }
         })
       })
       .catch(err => {
         console.log(err);
         res.status(500).json({
           error: err
         })
       })
     }
   catch (error) {
     return res.status(401).json({
       message: 'auth failed'
     })
   }
 
 
 })

 

module.exports = router;