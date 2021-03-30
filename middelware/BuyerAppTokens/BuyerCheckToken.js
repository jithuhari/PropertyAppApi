const jwt = require('jsonwebtoken');

//verify Admin is Logined or not(jwt with cookie)
module.exports =  function (req,res,next){
    const buyertoken = req.cookies.buyertoken
    console.log("token:",req.cookies.buyertoken);
    if(!buyertoken) return res.status(400).send('Access Denied');
 
   try{
         const verified = jwt.verify(buyertoken,process.env.TOKEN_BUYER);
    
        req.buyer = verified;
//console.log(req.admin);
        // const id = verified._id;
        // console.log('verify:' + verified);
         
         next();
    }catch(err){
         res.status(400).send('invalid token');
    }
 }