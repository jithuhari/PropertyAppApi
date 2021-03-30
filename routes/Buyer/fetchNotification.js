const router = require("express").Router();
const Notification = require('../../models/Notification');
const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');

//view all notifications
router.get('/notifications',buyerToken, async(req, res, ) => {
    try{
      const notification = await Notification.find();
      res.json(notification);
    }catch(err){
      res.json({message:err});
    }
    
    });

    module.exports=router;