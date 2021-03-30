const Joi = require('@hapi/joi');


//buyer login validation


const buyerregvalidation = (data)=>{
    const schema={
        email:Joi.string().required().email(),
        password:Joi.string().min(6).required(),

    };
    return Joi.validate(data,schema);
};
const buyerloginvalidation = (data)=>{
    const schema={
        email:Joi.string().required().email(),
        password:Joi.string().min(6).required(),

    };
    return Joi.validate(data,schema);
};

module.exports.buyerregvalidation=buyerregvalidation;
module.exports.buyerloginvalidation=buyerloginvalidation;