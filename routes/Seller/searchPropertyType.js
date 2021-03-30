const router = require("express").Router();
const Property = require('../../models/Property');
const sellerToken = require('../../middelware/SellerAppTokens/SellerCheckToken');



module.exports = router;