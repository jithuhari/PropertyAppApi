const router = require("express").Router();

const buyerToken = require('../../middelware/BuyerAppTokens/BuyerCheckToken');
const PersonalDetail = require('../../models/PersonalDetails');
const multer = require('multer');
const path = require('path');

//Storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
    

})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200 * 1024 * 1024
},
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.PNG') {
            return callback(new Error('This is not a correct format of the file'))
        }
        callback(null, true)
    },

 
})


//Add personal details of buyer
router.post('/',buyerToken,upload.single('ProfilePicture'),async(req,res)=>{
  
//create a new personalDetail
    const personalDetail = new PersonalDetail({
        buyerId:req.buyer,
        ProfilePicture:req.file.path,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        displayname:req.body.displayname,
        dateofbirth:req.body.dateofbirth,
        country:req.body.country,
        permanentaddress:req.body.permanentaddress,
        mobilenumber:req.body.mobilenumber,
        pincode:req.body.pincode,
        city:req.body.city,
      
        
           
    });
    try{
         const savedUser = await personalDetail.save();
        res.send({savedUser});
    }catch(err){
        res.status(400).send(err);
    }
  
  

});

//view all personalDetail
router.get('/personalDetail',buyerToken, async(req, res, ) => {
    try{
      const personalDetail = await PersonalDetail.find();
      res.json(personalDetail);
    }catch(err){
      res.json({message:err});
    }
    
    });


module.exports = router;