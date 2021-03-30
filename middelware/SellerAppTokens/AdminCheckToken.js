
const jwt = require('jsonwebtoken');

//verify Admin is Logined or not(jwt with cookie)
module.exports =  function (req,res,next){
    const token = req.cookies.token
    console.log("token:",req.cookies.token);
//     if(!token) return res.status(400).send('Access Denied');
 
   try{
         const verified = jwt.verify(token,process.env.TOKEN_SECRET);
    
        req.admin = verified;
//console.log(req.admin);
        // const id = verified._id;
        // console.log('verify:' + verified);
         
         next();
    }catch(err){
         res.status(400).send('invalid token');
    }
 }