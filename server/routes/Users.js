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
      console.log(cookies[cookies.length - 1].dataValues.sid)
      res.status(201).send({user:userAccount, sess: cookies[cookies.length - 1].dataValues.sid}) // Returns User's data along with newly created user session cookie data
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

/* Email Notification Data */
const {confirmation, orderUpdate} = require('./supportData/notifications/emailNotificationData');

/* Email Notifications */ 
router.post('/Email', asyncHandler(async(req, res)=>{

  const { Email, Order_ID, Notification_Type, Notification_Message} = req.body;

  const send = require('gmail-send')({
    user: "ptco.dev@gmail.com",
    pass: process.env.APP_PASS,
    to:   Email,
    subject: `${Notification_Message}${Order_ID}`,
  });

  const errorHandler = (error, result) => {
    if (error) return res.status(500).send(error);
    if (result) res.status(201).send('Sent');
  }

  if(Notification_Type === "Confirmation") send({html:  confirmation(req.body)}, (error, result) => errorHandler(error, result))
  if(Notification_Type === "Order Update") send({html:  orderUpdate(req.body)},  (error, result) => errorHandler(error, result))
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

/* Get User Account with route auth user validation*/
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
