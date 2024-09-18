const express = require('express');
const Router = express.Router();

/* Sequelize*/
const db = require('../db');
const { templateUser , Cart , Product, Orders, Shipping, Payments } = db.models;

const asyncHandler = require('./helperFunctions/asyncHandler');


Router.get('/:userid', asyncHandler(async(req, res)=>{
    const orders = await Orders.findAll({where: {templateUserUserID: req.params.userid}});
    res.status(201).send(orders);
}))

Router.get('/Details/:orderid', asyncHandler(async(req, res)=>{
    const orders = await Orders.findOne({where: {Order_ID: req.params.orderid}, include: [{model: Shipping}, {model: Payments}]});
    res.status(201).send(orders);
}))

Router.post('/Update', asyncHandler(async(req, res)=>{
    const orderCheck = await Orders.findOne({where: {Order_ID: req.body.Order_ID}, include: [{model: Shipping}, {model: Payments}]});
    
    if(orderCheck.Status === "Processing" || orderCheck.Status === "Shipped") {
        await Orders.update({Status: orderCheck.Status === "Processing" ? "Shipped":"Delivered"}, {where: {Order_ID: req.body.Order_ID}})
        const order = await Orders.findOne({where: {Order_ID: req.body.Order_ID}, include: [{model: Shipping}, {model: Payments}]});
        return res.status(201).send(order);
    }
    res.status(201).send("Delivered");
}))

Router.delete('/:orderid/:userid', asyncHandler(async(req, res)=>{
    await Orders.destroy({where: {Order_ID: req.params.orderid}});
    const orders = await Orders.findAll({where: {templateUserUserID: req.params.userid}});
    res.status(201).send(orders)
}))

module.exports = Router;