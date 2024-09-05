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
    await Orders.update({Status: req.body.Status}, {where: {Order_ID: req.body.Order_ID}})
    const order = await Orders.findOne({where: {Order_ID: req.body.Order_ID}, include: [{model: Shipping}, {model: Payments}]});
    res.status(201).send(order);
}))

Router.delete('/:orderid/:userid', asyncHandler(async(req, res)=>{
    await Orders.destroy({where: {Order_ID: req.params.orderid}});
    const orders = await Orders.findAll({where: {templateUserUserID: req.params.userid}});
    res.status(201).send(orders)
}))

module.exports = Router;