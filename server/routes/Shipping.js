const express = require('express');
const Router = express.Router();

const asyncHandler = require('./helperFunctions/asyncHandler');
const throwError = require('./helperFunctions/throwError');

/* Sequelize*/
const db = require('../db');
const { Op } = require('sequelize');
const { Filters , templateUser, Product , Reviews , Payments, Shipping, Delivery} = db.models;

Router.post('/Update', asyncHandler(async(req, res)=>{
    await Shipping.update({Current: false}, {where: {templateUserUserID: req.body.User_ID}});
    await Shipping.update({Current: req.body.Current}, {where: {Address_ID: req.body.Address_ID}});
    const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, include: [{model: Filters}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
    res.status(201).send(user)    
}))

Router.delete('/Delete/:addressid/:userid', asyncHandler(async(req, res)=>{
    await Shipping.destroy({where: {Address_ID: req.params.addressid}})
    const user = await templateUser.findOne({where: {User_ID: req.params.userid}, include: [{model: Filters}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
    res.status(201).send(user) 
}))


Router.post('/Add', asyncHandler(async(req, res)=> {
    req.body.addresstwo = req.body.addresstwo ? req.body.addresstwo:false;
    if(Object.values(req.body).map( value => { 
        if(value === "") throwError("Please fill all fields", 401);
    }));

    await Shipping.update({Current: false}, {where: {templateUserUserID: req.body.User_ID}});
    await Shipping.create({
        AddressOne: req.body.addressone,
        AddressTwo: req.body.addresstwo ? req.body.addresstwo:"",
        City: req.body.city,
        State: req.body.state,
        ZipCode: req.body.zip,
        templateUserUserID: req.body.User_ID,
        Current: true
    })
    
    const user = await templateUser.findOne({where: {User_ID: req.body.User_ID}, include: [{model: Filters}, {model: Payments}, {model: Shipping}, {model: Delivery}]});
    res.status(201).send(user)
}))

module.exports = Router;