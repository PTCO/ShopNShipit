const express = require('express');
const Router = express.Router();

const {encrypt , decrypt } = require('node-encryption');
const asyncHandler = require('./helperFunctions/asyncHandler');
const throwError = require('./helperFunctions/throwError');

/* Sequelize*/
const db = require('../db');
const { templateUser , Cart , Product, Orders , Filters, Payments, Shipping, Delivery } = db.models;

Router.delete('/Delete/:paymentid/:userid', asyncHandler(async(req, res)=> {
    await Payments.destroy({where: {Payment_ID: req.params.paymentid}})

    const user = await templateUser.findOne({where: {User_ID: req.params.userid}, include: [{model: Filters}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
    res.status(201).send(user);
}))

Router.post('/Update', asyncHandler(async(req, res)=>{
    await Payments.update({Current: false}, {where: {templateUserUserID: req.body.User_ID}});
    await Payments.update({Current: req.body.Current}, {where: {Payment_ID: req.body.Payment_ID}});
    const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, include: [{model: Filters}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
    res.status(201).send(user)    
}))

Router.post('/Add', asyncHandler(async(req, res)=>{

    if(Object.values(req.body).map( value => { 
        if(value === "") throwError("Please fill all fields", 401);
    }));

    console.log(req.body.cardnumber.length)

    if(req.body.cardnumber.length < 15 || req.body.cardnumber.length > 16) throwError("Card number must be between 15-16 digits", 401);

    if(!/^\d\d\/\d\d$/gm.test(req.body.expiration)) throwError("Exp should be - mm/yy", 401)

    if(!/^\d\d\d$/.test(req.body.security)) throwError("CVV must contain be 3 numbers", 401)

    await Payments.update({Current: false}, {where: {templateUserUserID: req.body.User_ID}});
    await Payments.create({
        Expiration: req.body.expiration,
        Number:  encrypt(req.body.cardnumber, process.env.SECRET),
        Last4: parseInt(req.body.cardnumber.substring(12, 16)),
        Type: req.body.type,
        Security: encrypt(req.body.security, process.env.SECRET),
        CardHolder: encrypt(req.body.cardholder, process.env.SECRET),
        Current: true,
        templateUserUserID: req.body.User_ID
    })
    const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, include: [{model: Filters}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
    res.status(201).send(user);
}))

module.exports = Router;