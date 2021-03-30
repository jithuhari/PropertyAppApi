const router = require("express").Router();
const checkSellerToken =require('../../middelware/SellerAppTokens/SellerCheckToken');
const Property = require('../../models/Property');
const multer = require('multer');
const path = require('path');

//Storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    },
    
    // fileFilter(req,file,cb){
    //     if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg|doc|pdf)$/))
    //     return cb(new Error('This is not a correct format of the file'))
    //     cb(undefined,true)
    // }
})

const upload = multer({
    storage: storage,

    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg' && ext !== '.docx' && ext !== '.PNG') {
            return callback(new Error('This is not a correct format of the file'))
        }
        callback(null, true)
    },

 
})



//Add property by each seller
router.post('/',checkSellerToken,upload.single('propertyDocuments'),async(req,res)=>{
   
    console.log(req.file);
 
//create a new property
    const property = new Property({
        sellerId:req.seller,
        favorite:req.body.favorite,
        bidlist:req.body.bidlist,
        branchname:req.body.branchname,
        state:req.body.state,
        district:req.body.district,
        city:req.body.city,
        pincode:req.body.pincode,
        reservedprice:req.body.reservedprice,
        emdrs:req.body.emdrs,
        emdlastdate:req.body.emdlastdate,
        borrowename:req.body.borrowename,
        ownername:req.body.ownername,
        ownershiptype:req.body.ownershiptype,
        summarydescription:req.body.summarydescription,
        propertytype:req.body.propertytype,
        propertysubtype:req.body.propertysubtype,
        typeoftitledeep:req.body.typeoftitledeep,
        statusofpossession:req.body.statusofpossession,
        auctionopendate:req.body.auctionopendate,
        auctionclosedate:req.body.auctionclosedate,
        scaledbidlastdate:req.body.scaledbidlastdate,
        scaledbidextendeddate:req.body.scaledbidextendeddate,
        address:req.body.address,
        nearestairportstand:req.body.nearestairportstand,
        propertyDocuments:req.file.path,
        
           
    });
    try{
         const savedUser = await property.save();
        res.send({savedUser});
    }catch(err){
        res.status(400).send(err);
    }
  
  

});



//Fetch specific property
router.get('/:propId',async(req,res)=>{
    try{

    
  const prop = await  Property.findById(req.params.propId);
    res.json(prop);
}catch(err){
    res.json({message:err}); 
}
});
//delete property
router.delete('/:propId',async(req,res)=>{
    try{
        const removeProperty=await Property.remove({_id:req.params.propId});
        res.json(removeProperty);

    }catch(err){
        res.json({message:err});
    }
});




//property update
router.patch('/:propId',upload.single('propertyDocuments'),async(req,res)=>{
try{
   const updatedProperty= await Property.updateOne(
       {_id:req.params.propId},
       {$set:{
        branchname:req.body.branchname,
        state:req.body.state,
        district:req.body.district,
        city:req.body.city,
        reservedprice:req.body.reservedprice,
        emdrs:req.body.emdrs,
        emdlastdate:req.body.emdlastdate,
        borrowename:req.body.borrowename,
        ownername:req.body.ownername,
        ownershiptype:req.body.ownershiptype,
        summarydescription:req.body.summarydescription,
        propertytype:req.body.propertytype,
        propertysubtype:req.body.propertysubtype,
        typeoftitledeep:req.body.typeoftitledeep,
        statusofpossession:req.body.statusofpossession,
        auctionopendate:req.body.auctionopendate,
        auctionclosedate:req.body.auctionclosedate,
        scaledbidlastdate:req.body.scaledbidlastdate,
        scaledbidextendeddate:req.body.scaledbidextendeddate,
        address:req.body.address,
        nearestairportstand:req.body.nearestairportstand,
        propertyDocuments:req.file.path,
       }},
   );
   res.json(updatedProperty);
}catch(err){
    res.json({message:err});
}

});



module.exports=router;