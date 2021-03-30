const router = require('express').Router();
const Seller = require('../../models/Seller');
const checkSellerToken =require('../../middelware/SellerAppTokens/SellerCheckToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Change password Seller

router.patch('/changeseller',checkSellerToken, (req, res, next) => {
    try{
       console.log(req.cookies.sellertoken)
       const decoded = jwt.verify(req.cookies.sellertoken, process.env.TOKEN_SELLER)
   
       const id = decoded.sellerid;
    //    console.log(id);
    //   console.log('decode:' + decoded )
      Seller.findOne({ _id: id })
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
   
                      Seller.updateOne({ _id: id }, { $set: { password: hash } })
                       .exec()
                       .then(result => {
                         console.log('Seller password updated');
                         res.status(200).json({
                           message : 'Seller password updated '
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
   
module.exports=router;