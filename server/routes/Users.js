// NPM 
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

/* Passport Setup */
const passport = require('passport');

const googlePassportConfig = { 
  scope: ['profile', 'email'], // Google Scope - change scope as needed & LEAVE "session" option as false
  session: false, // Do Not Change
  failureRedirect: "http://localhost:3000/Login" // Change Redirect URL as needed - this runs if user rejects OAUTH signup/login or an error occurs
}; 

const twitterPassportConfig = { 
  scope: ['users.read', 'offline.access'], // Twitter Scope - change scope as needed & LEAVE "session" option as false
  session: false, // Do Not Change 
  failureRedirect: "http://localhost:3000/Login" // Change Redirect URL as needed - this runs if user rejects OAUTH signup/login or an error occurs
}; 

/* Sequelize*/
const db = require('../db');
const { templateUser , UserSessions , Filters, Cart, Payments, Shipping, Delivery } = db.models;

/* Middleware */
const authUserValidator = require('./middleware/authUserValidation');
const throwError  = require('./helperFunctions/throwError');

/* Helper Functions */

const asyncHandler = require('./helperFunctions/asyncHandler');
const { where } = require('sequelize');

// Find User Session Cookie Function
const findUserCookie = async (req, res, user, request) => {
  const userAccount = await templateUser.findOne({where: {User_ID: user.User_ID}, attributes: { exclude: ['createdAt', 'updatedAt', 'confirmedPassword']}, include: [{model: Filters, required: true}, {model: Payments}, {model: Shipping}, {model: Delivery}]})


  const sessions = await UserSessions.findAll(); 
  const ck = sessions.map( sess => JSON.parse(sess.data).userid);  // Returns array of User IDs from each User session Cookie

  if(!ck.includes(user.User_ID)) { // Checks if User ID is not included in array of User IDs from session cookies
    req.session.userid = user.User_ID;
    req.session.save(); // Create new user session cookie with current user's ID
    if(request === 'Oauth') {
      return res.redirect('http://localhost:3000/Home')
    }
    setTimeout(async () => {
      const cookies = await UserSessions.findAll();
      res.status(201).send({user:userAccount, sess: cookies[cookies.length - 1].sid}) // Returns User's data along with newly created user session cookie data
    }, 2000)
    return;
  } 

  const sessIndex = ck.findIndex((cookie)=> { 
    return cookie.indexOf(ck.includes(user.User_ID));// Returns the index of the current User's ID, from array of User IDs from each User session Cookie
  })

  if(request === 'Delete') { // Deletes intended User Session Cookie if "Delete" request sent when findUserCookie function is called
    await UserSessions.destroy({ where: {sid: sessions[sessIndex].sid}});
    return res.status(201).end();
  }

  if(request === 'Oauth') {
    req.session.userid = user.User_ID;
    req.session.save();
    return res.redirect('http://localhost:3000/Home')
  }

  res.status(201).send({user:userAccount, sess: sessions[sessIndex].sid}) // Returns User's data along with newest user's session cookie data
}


templateUser.hasOne(Filters, {
  onDelete: "CASCADE",
})
Filters.belongsTo(templateUser, {targetKey: "Username"})
templateUser.hasOne(Cart, {
  onDelete: "CASCADE",
})
Cart.belongsTo(templateUser)

Delivery.hasMany(templateUser, {onDelete: "CASCADE"})
templateUser.belongsTo(Delivery);

templateUser.hasMany(Payments, {onDelete: "CASCADE"})
Payments.belongsTo(templateUser);

templateUser.hasMany(Shipping, {onDelete: "CASCADE"})
Shipping.belongsTo(templateUser);

/* Email Notifications */ 
router.get('/Email', asyncHandler(async(req, res)=>{
  
  const {Order_ID, Email, Status, AddressOne, AddressTwo, State, City, ZipCode, DeliveryDesc, DeliveryWindow, SubTotal, DeliveryCost, Tax, ItemCount} = req.body;

  const send = require('gmail-send')({
    user: "ptco.dev@gmail.com",
    pass: process.env.APP_PASS,
    to:   Email,
    subject: `Order confirmation #${Order_ID}`,
  });
  send({
    html:    `
      <div style="width: 100%; height: 100%">
      <h1 style="
      width: 100%;
      display: flex;
      border-bottom: 2px solid;
      border-color: #4d5c46;
      padding: 0 0 5px 0;
      height: fit-content;
      margin-bottom: 10px;
      "  
      disabled>
        <a href="http://localhost:3000/Login" style="text-decoration: none;  display: flex; margin: 0 auto; width: fit-content;">
            <img src="https://i.ibb.co/5vYxHfb/Shop-NShipit.png" alt="company logo" style="width:50px; margin-left: auto; margin-right: 10px"> 
            <b style="color: #4d5c46; margin-right: auto" >Shop<b style="background: black; color: white; padding: 4px; border-radius: 4px">N</b><b style="color: #bd7c71">Shipit</b></b>
        </a>
      </h1>
        <div className="confirmation">
            <h2 style="padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;" >Order Placed</h2>
            <span style="display: flex">
                <p style="font-size: 20px; font-weight: bold; margin-top: 5px"><b style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46">Confirmation #</b> ${Order_ID}</p>
            </span>
            <span style="display: flex;">
                <h5 style="margin: 0; margin-right: 5px;  font-size: 16px">Order Status</h5>
                <p style="padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0">${Status}</p>
            </span>
            <div style="border-top: 2px solid #4d5c46; margin-top: 10px">
                <h2 style="margin: 16px 0 5px 0; padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;">Shipping</h2>
                <div style="padding: 4px 10px; border-radius: 4px; border: 2px solid lightgray; margin-top: 15px; width: fit-content;">
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46; font-size: 17px;">${AddressOne} ${AddressTwo}</p>
                    <p style="color: #4d5c46; font-size: 17px; margin-top: 5px"></p>
                    <p style="font-size: 17px; margin: 5px 0; width: fit-content">${City}, ${State} ${ZipCode}</p>
                </div>
            </div>
            <div style="border-top: 2px solid #4d5c46; margin-top: 10px">
                <h2 style="margin: 16px 0 5px 0; padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;">Delivery Option</h2>
                <div style="padding: 4px 10px; border-radius: 4px; border: 2px solid lightgray; margin-top: 15px; width: fit-content;">
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46; font-size: 17px;">${DeliveryDesc}</p>
                    <p style="font-size: 17px;">${DeliveryWindow}</p>
                </div>
            </div>
            <div style="border-top: 2px solid #4d5c46; margin-top: 10px">
                <h2 style="margin: 16px 0 5px 0; padding: 4px; border-radius: 4px; color: white; background: #bd7c71; width: fit-content;">Breakdown</h2>
                <div style="display: flex; margin-top: 10px">
                    <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0; width: fit-content">Subtotal <b style="color: white;">$ ${SubTotal}</b></p>
                    <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 8px; width: fit-content">Shipping <b style="color: white;">$ ${DeliveryCost}</b></p>
                    <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #111; height: fit-content; margin: auto 0; width: fit-content">Tax <b style="color: white;">$ ${Tax}</b></p>
                </div>
                <p style="font-style: bold; padding: 4px; border-radius: 4px; color: white; background: #4d5c46; height: fit-content; margin: auto 0; margin-top: 8px; width: fit-content">Total <b style="color: white;">$ ${(SubTotal + DeliveryCost + Tax)}</b></p>
                <span style="display: flex;">
                    <h3 style="display: flex; margin-right: 5px">Items Count</h3>
                    <p style="padding: 4px; border-radius: 4px; color: white; background: #4d5c46;">${ItemCount}</p>
                </span>
                <a href="http://localhost:3000/Home/Settings/Orders" style="margin-top: 10px; text-decoration: none; width: fit-content; display: inline-block;"><h3 style="width: fit-content; padding: 8px; border-radius: 4px; font-size: 16px;  color: white; background: #111; border-color: #111">View Order</h3></a>
            </div>
        </div>
      </div>
    `,  
  }, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
  })
  res.status(201).end();
}))

/* SignUp Template */
router.post('/Signup', asyncHandler(async(req, res)=>{
  Object.values(req.body).map( value => {
    if(value === '') throwError('Please fill all fields', 401);
  })
  const user = await templateUser.create({
    Username: req.body.Username,
    Email: req.body.Username,
    Password: req.body.Password,
    confirmedPassword: req.body.ConfirmPassword
  })
  await Filters.create({
    templateUserUserID: user.User_ID
  });

  await findUserCookie(req, res, user);
}));

/* Login Template */
router.post('/Login', asyncHandler(async(req, res)=>{
  Object.values(req.body).map( value => {
    if(value === '') throwError('Please fill all fields', 401);
  })
  const user = await templateUser.findOne({where: {
    Username: req.body.Username,
  }});
  if(!user) throwError('Invalid Username', 401);
  if(!bcrypt.compareSync(req.body.Password , user.confirmedPassword)) throwError('Incorrect Password', 401);
  await findUserCookie(req, res, user);
}));

/* Account Change */ 
router.post('/Change', asyncHandler(async(req, res)=> {
  Object.values(req.body).map( value => {
    if(value === '') throwError('Please fill all fields', 401);
  })

  if(req.body.Request === 'password') {
    const pwdCheck = await templateUser.findOne({where: {User_ID: req.body.User_ID}});
  
    if(bcrypt.compareSync(req.body.oldPassword, pwdCheck.confirmedPassword)) {
      await templateUser.update({confirmedPassword: req.body.newPassword  },{where: {User_ID: req.body.User_ID}})
      const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, attributes: { exclude: ['createdAt', 'updatedAt', 'confirmedPassword']}, include: [{model: Filters, required: true}, {model: Payments}, {model: Shipping}]});
      return res.status(201).send(user);
    }
    else {
      throwError("Incorrect password", 401)
    }
  }
  
  if(req.body.Request === 'username') {
    const usrnCheck = await templateUser.findOne({where: {Username: req.body.oldUsername}});
    if(usrnCheck) {
      await templateUser.update({Username: req.body.newUsername  },{where: {User_ID: req.body.User_ID}})
      const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, attributes: { exclude: ['createdAt', 'updatedAt', 'confirmedPassword']}, include: [{model: Filters, required: true}, {model: Payments}, {model: Shipping}]});
      return res.status(201).send(user);
    }
    else {
      throwError("Incorrect username", 401)
    }
  }

  if(req.body.Request === 'portrait') {
    await templateUser.update({Portrait: req.body.Portrait}, {where: {User_ID: req.body.User_ID}});
    const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, attributes: { exclude: ['createdAt', 'updatedAt', 'confirmedPassword']}, include: [{model: Filters, required: true}, {model: Payments}, {model: Shipping}]});
    res.status(201).send(user);
  }

}))

router.get('/delivery', asyncHandler(async(req, res)=>{
    await Delivery.create({
        Window: "12-15 business days",
        Description: "Free delivery",
        Cost: 0.00
    })
    res.status(201).end();
}))

router.get('/Delivery/Options', asyncHandler(async(req, res)=>{
    const options = await Delivery.findAll()
    res.status(201).send(options);
}))

router.post('/Delivery/Select', asyncHandler(async(req, res)=>{
  await templateUser.update({DeliveryOptionID: req.body.Option_ID}, {where: {User_ID: req.body.User_ID}})
  const userAccount = await templateUser.findOne({where: {User_ID: req.body.User_ID}, attributes: { exclude: ['createdAt', 'updatedAt', 'confirmedPassword']}, include: [{model: Filters, required: true}, {model: Payments}, {model: Shipping}, {model: Delivery}]})
  res.status(201).send(userAccount);
}))

/* Signout Template */
router.get('/Signout/:userid', asyncHandler(async(req, res)=>{
  const user = await templateUser.findOne({ where: { User_ID: req.params.userid}});
  await findUserCookie(req, res, user, 'Delete');
}))

/* Get User Account Example with route auth user validation*/
router.get('/User/:sid', authUserValidator, asyncHandler(async(req, res)=>{
  const cookie = await UserSessions.findOne({ where: { sid: req.params.sid}});
  const user =  await templateUser.findOne({ where: { User_ID: JSON.parse(cookie.data).userid}, attributes: { exclude: ['createdAt', 'updatedAt', 'confirmedPassword']}, include: [{model: Filters, required: true}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
  res.status(201).send(user);
}))

/* Google Route Templates */
router.get('/Google', passport.authenticate('google', googlePassportConfig));
router.get('/Google/Callback', passport.authenticate('google', googlePassportConfig), asyncHandler(async (req, res)=>{
  await Filters.create({
    templateUserUserID: req.user.User_ID
  });
  await findUserCookie(req, res, req.user, 'Oauth');
}))

/* Twitter Route Template */
router.get('/Twitter', passport.authenticate('twitter', twitterPassportConfig));
router.get('/Twitter/Callback', passport.authenticate('twitter', twitterPassportConfig), asyncHandler(async(req, res)=>{
  await findUserCookie(req, res, req.user, 'Oauth');
}))

module.exports = router;
