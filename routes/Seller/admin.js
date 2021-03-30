const router = require('express').Router();
const Admin= require('../../models/adminlogin');

const {adminloginvalidation} = require('../../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Register admin
router.post('/register',async(req,res)=>{

//Hide password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

//create a new user
        const admin = new Admin({
            email:req.body.email,
            password:hashedPassword,
        });
        try{
            const savedUser = await admin.save();
            res.send({savedUser});
        }catch(err){
            res.status(400).send(err);
        }
    
    
    });


//Login
router.post('/login',async (req,res)=>{

//validate user
    const {error} = adminloginvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

//checking if the email exist
    const admin = await Admin.findOne({email:req.body.email});
    if(!admin) return res.status(400).send('Email incorrect');

//password is incorrect
    const validPass = await bcrypt.compare(req.body.password,admin.password);
    if (!validPass) return res.status(400).send('invalid password');


//create and assign a token
//(with header)
    // const token = jwt.sign({_id: admin._id},process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send(token);

  //  Cookie

    const token = jwt.sign({
        _id: admin._id
      }, process.env.TOKEN_SECRET,
        )
      res.cookie('token', token, { maxAge: 3600 })
      console.log(token);
      res.status(200).json({ message: 'Login successful', data: token })
      res.end()
/* res.send("logged in"); */

});

//Admin logout

router.get('/logout', (req, res)=>{
    res.clearCookie('token');
    res.send('Logout Successfully');
 });

module.exports=router;
