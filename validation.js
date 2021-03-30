const Joi = require('@hapi/joi');

//admin login validation

const adminloginvalidation = (data)=>{
    const schema={
        email:Joi.string().required().email(),
        password:Joi.string().min(6).required(),

    };
    return Joi.validate(data,schema);
};
//seller registration validation
const sellerregvalidation = (data)=>{
    const schema={
        bankname:Joi.string().min(4).required(),
        branchname:Joi.string().min(4).required(),
        state:Joi.string().min(4).required(),
        district:Joi.string().min(4).required(),
        city:Joi.string().min(4).required(),
        pincode:Joi.string().min(6).required(),
       
        bankemail:Joi.string().required().email(),
        password:Joi.string().min(6).required(),

    };
    return Joi.validate(data,schema);
};
//seller login validation

const sellerloginvalidation = (data)=>{
    const schema={
        bankemail:Joi.string().required().email(),
        password:Joi.string().min(6).required(),

    };
    return Joi.validate(data,schema);
};

module.exports.adminloginvalidation=adminloginvalidation;
module.exports.sellerregvalidation=sellerregvalidation;
module.exports.sellerloginvalidation=sellerloginvalidation;
