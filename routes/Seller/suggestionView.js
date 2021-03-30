const router = require("express").Router();
const checkAdminToken = require('../../middelware/SellerAppTokens/AdminCheckToken');
const Suggestion = require('../../models/Suggestion');

//view all Suggestion
router.get('/',checkAdminToken, async(req, res, ) => {
    try{
      const suggestion = await Suggestion.find();
      res.json(suggestion);
    }catch(err){
      res.json({message:err});
    }
    
    });

  //Delete suggestion
  
router.delete('/:suggestionId',checkAdminToken,async(req,res)=>{
    try{
   const removedSuggestion =await Suggestion.remove({_id:req.params.suggestionId});
   res.json(removedSuggestion);
    }catch(err){
      res.json({message:err});
    }
  });
  

module.exports = router;   
  