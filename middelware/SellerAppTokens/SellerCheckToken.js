
const jwt = require('jsonwebtoken');

//verify Admin is Logined or not(jwt with cookie)
module.exports =  function (req,res,next){
    const sellertoken = req.cookies.sellertoken
//     console.log("sellertoken:",req.cookies.sellertoken);
    if(!sellertoken) return res.status(400).send('Access Denied');
 
   try{
         const verified = jwt.verify(sellertoken,process.env.TOKEN_SELLER);
    
        req.seller = verified;
//console.log(req.admin);
        // const id = verified._id;
        // console.log('verify:' + verified);
         
         next();
    }catch(err){
         res.status(400).send('invalid token');
    }
 }