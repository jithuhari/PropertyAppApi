const router = require("express").Router();
const Property = require('../../models/Property');
const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');

//Search property
router.post('/',buyerToken,async(req, res) =>{
   
    Property.find({$and:[{auctionopendate:req.body.auctionopendate},
        {branchname:req.body.branchname},
        {"propertytype":/commerical/},
        {state:req.body.state},
        {district:req.body.district},
        {city:req.body.city},
        {pincode:req.body.pincode},
    ]}, function(err, propsearch) 
 {
    if (err)
    {
        res.send(err);
    }
  
    res.json(propsearch);

 });
//  //Without propertId
// if (req.body.propId== null) {
//     Property.find({$and:[{auctionopendate:req.body.auctionopendate},
//         {branchname:req.body.branchname},
//         {propertytype:req.body.propertytype},
//         {state:req.body.state},
//         {district:req.body.district},
//         {city:req.body.city},
//         {pincode:req.body.pincode},
//     ]}, function(err, propsearch) 
//  {
//     if (err)
//     {
//         res.send(err);
//     }
  
//     res.json(propsearch);

//  }); 
// }else{
//     ////With propertId
//     Property.find({$and:[{auctionopendate:req.body.auctionopendate},
//         {branchname:req.body.branchname},
//         {propertytype:req.body.propertytype},
//         {state:req.body.state},
//         {district:req.body.district},
//         {city:req.body.city},
//         { _id: req.body.propId},
//         {pincode:req.body.pincode},
//     ]}, function(err, propsearch) 
//  {
//     if (err)
//     {
//         res.send(err);
//     }
  
//     res.json(propsearch);

//  }); 

// }
    
});


module.exports = router;