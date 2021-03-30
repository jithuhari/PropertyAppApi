const { Router } = require('express');
const express = require ('express');
var cors = require('cors');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const checkSellerToken =require('./middelware/SellerAppTokens/SellerCheckToken');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

dotenv.config();



//import routes
//seller
const loginRoute = require('./routes/Seller/admin');
const sellerRoute= require('./routes/Seller/seller');
const sellerloginRoute= require('./routes/Seller/sellerlogin');
const propertyRoute = require('./routes/Seller/property');
const notificationRoute = require('./routes/Seller/notification');
const adminnotificationRoute = require('./routes/Seller/notificationAdmin')
const propertyfetchRoute = require('./routes/Seller/PropertyFetch');
const suggestionViewRoute = require('./routes/Seller/suggestionView');
const contactBuyerView = require('./routes/Seller/contactBuyerView');
const sellerChangePassRoute = require('./routes/Seller/changesellerpass');
//Buyer
const buyerRoute = require('./routes/Buyer/buyer');
const buyerNotifRoute = require('./routes/Buyer/fetchNotification');
const searchRoute = require('./routes/Buyer/searchProperties');
const ContactBuyerRoute = require('./routes/Buyer/contactBuyer');
const suggestionRoute = require('./routes/Buyer/suggestion');
const personaldetailsRoute = require('./routes/Buyer/personDetails');
const favoriteRoute = require('./routes/Buyer/favorite');
const bidlistRoute = require('./routes/Buyer/bidlist');


//connect to db
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true , useUnifiedTopology: true },
  () => console.log("connected to db"));

app.use(cors());
//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//route middlewares
//Seller
app.use('/api/admin',loginRoute);
app.use('/api/seller',sellerRoute);
app.use('/api/seller/details',sellerloginRoute);
app.use('/api/seller/property',checkSellerToken,express.static('upload/images'),propertyRoute);
app.use('/api/seller/notification',notificationRoute);
app.use('/api/admin/notification',adminnotificationRoute);
app.use('/api/seller/propertyfetch',checkSellerToken,propertyfetchRoute);
app.use('/api/suggestions',suggestionViewRoute);
app.use('/api/seller/contactBuyer',contactBuyerView);
app.use('/api/seller/password',sellerChangePassRoute);

//Buyer
app.use('/api/buyer',buyerRoute);
app.use('/api/buyer/fetch',buyerNotifRoute);
app.use('/api/buyer/search',searchRoute);
app.use('/api/buyer/ContactBuyer',ContactBuyerRoute);
app.use('/api/buyer/suggestions',suggestionRoute);
app.use('/api/buyer/personalDetails',personaldetailsRoute);
app.use('/api/buyer/favorite',favoriteRoute);
app.use('/api/buyer/bidlist',bidlistRoute);


//port
app.listen(5000,()=>console.log('Server Up and Running'));