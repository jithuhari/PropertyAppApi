const router = require("express").Router();
const Notification = require('../../models/Notification');
const checkAdminToken = require('../../middelware/SellerAppTokens/AdminCheckToken');
//view all notifications
router.get('/', async(req, res, ) => {
    try{
      const notification = await Notification.find();
      res.json(notification);
    }catch(err){
      res.json({message:err});
    }
    
    });
 
 //delete notification by id
router.delete('/:notiId',checkAdminToken,async(req,res)=>{
    try{
   const removedNotification =await Notification.remove({_id:req.params.notiId});
   res.json(removedNotification);
    }catch(err){
      res.json({message:err});
    }
  });   

module.exports=router;