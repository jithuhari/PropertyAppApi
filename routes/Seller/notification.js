const router = require("express").Router();
const Notification = require('../../models/Notification');
const checkSellerToken =require('../../middelware/SellerAppTokens/SellerCheckToken');
const Property = require('../../models/Property');
//Add notification
router.post('/',async(req,res)=>{
   
//create a new property
    const notification = new Notification({
        sellerId:req.seller,
        title:req.body.title,
        message:req.body.message,
        
        
           
    });
    try{
         const savedUser = await notification.save();
        res.send({savedUser});
    }catch(err){
        res.status(400).send(err);
    }
  
  

});
// Fetch specific Seller notifications
router.get('/:sellId',checkSellerToken,async(req,res)=>{
    try{

  const sellId =  req.params.sellId
  console.log(req.params.sellId);
  const notification = await  Notification.find({sellerId:sellId});
    res.json(notification);
}catch(err){
    res.json({message:err}); 
}
});

//Delete  specific seller notification

router.delete('/:sellId',checkSellerToken,async(req,res)=>{
    try{
        
   const sellId =  req.params.sellId
   console.log(sellId);
   const removedNotif =await Notification.remove({_id:sellId});
   res.json(removedNotif);
    }catch(err){
      res.json({message:err});
    }
  });

//Update specific seller notification

router.patch('/:sellId',checkSellerToken,async(req,res) =>{
   
       try{
          const updatedNotify = await Notification.updateOne(
             {_id:req.params.sellId},
             {$set:{title:req.body.title,
                message:req.body.message,
                
    
                
             }},
             
          );
          res.json(updatedNotify);
       }catch(err){
          res.json({message:err});
       }
    
    });


module.exports=router;