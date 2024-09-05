const express = require('express');
const Router = express.Router();

/* Sequelize*/
const db = require('../db');
const { templateUser , Cart , Product, Orders, Payments, Shipping } = db.models;
const { Op } = require('sequelize');

/* Helper Functions */
const asyncHandler = require('./helperFunctions/asyncHandler');
const throwError = require('./helperFunctions/throwError');
const outOfStockCheck = async(userid) => {
    const cart = await Cart.findAll({where: {templateUserUserID: userid}, include: [{model: Product}]})
    let outOfStockItems = [];
    cart.map( item => {
        if(item.Product.Stock === 0 ) {
            outOfStockItems.push(item.Product);
        }
    })
    console.log(outOfStockItems)
    return outOfStockItems;
}

Product.hasMany(Cart, {onDelete: "CASCADE"})
Cart.belongsTo(Product);



templateUser.hasMany(Orders, {onDelete: "CASCADE"})
Orders.belongsTo(templateUser);

Payments.hasMany(Orders, {onDelete: "CASCADE"})
Orders.belongsTo(Payments);

Shipping.hasMany(Orders, {onDelete: "CASCADE"})
Orders.belongsTo(Shipping);



Router.get('/:userid', asyncHandler(async(req, res)=> {
    const cart = await Cart.findAll({where: {templateUserUserID: req.params.userid}, include: [{model: Product}]})
    res.status(201).send(cart);
}))

Router.post('/:userid/Stock' ,asyncHandler(async(req, res)=>{
    let outOfStock = await outOfStockCheck(req.params.userid)
    res.status(201).send(outOfStock);
}))

Router.post('/Add', asyncHandler(async(req, res)=> {
    const exists = await Cart.findOne({where: {ProductProductID: req.body.Product_ID, templateUserUserID: req.body.User_ID}});
    const stockCheck = await Product.findOne({where: {Product_ID: req.body.Product_ID}});
    
    if(stockCheck.Stock == 0){
        return res.status(201).send({message: "OutOfStock", product: stockCheck})
    }
    else if(exists ) {
        await Cart.update({Quantity: exists.Quantity + 1}, {where: {Cart_ID: exists.Cart_ID}})
    }
    else {
        await Cart.create({
            ProductProductID: req.body.Product_ID,
            templateUserUserID: req.body.User_ID
        })
    }

    const cart = await Cart.findAll({where: {templateUserUserID:  req.body.User_ID}, include: [{model: Product}]})
    res.status(201).send(cart);
}))

Router.post('/Quantity', asyncHandler(async(req, res)=> {
    await Cart.update(
        {Quantity: req.body.Quantity},
        {where: { Cart_ID: req.body.Cart_ID}}
    )
    const cart = await Cart.findAll({where: {templateUserUserID:  req.body.User_ID}, include: [{model: Product}]})
    res.status(201).send(cart);
}))

Router.post('/Checkout', asyncHandler(async(req, res)=>{
    const {User_ID, Thumbnail, ItemsCount, SubTotal, Payment_ID, Cart, Address_ID, Delivery} = req.body;

    // Out Of Stock Check
    let outOfStock = await outOfStockCheck(User_ID);
    if(outOfStock.length > 0) {
        res.status(201).send({outOfStock: outOfStock});
        return 
    }

    const cartItems = Cart.map(item => item.Product);
    
    const order = await Orders.create({
        templateUserUserID: User_ID,
        PaymentPaymentID: Payment_ID,
        ShippingAddressID: Address_ID,
        Thumbnail: Thumbnail[0],
        ItemsCount: ItemsCount,
        SubTotal: SubTotal,
        Tax: process.env.TAX,
        ShippingPrice: process.env.SHIPPING,
        Cart: cartItems,
        Delivery: Delivery
    });


    const orders = await Orders.findAll({where: {templateUserUserID: User_ID}, include: [{model: Shipping}, {model: Payments}]});
    res.status(201).send({orders, order});
}))

Router.get('/Delete/:cartid/:userid', asyncHandler(async(req, res)=> {
    await Cart.destroy({ where: {Cart_ID: req.params.cartid}});
    const cart = await Cart.findAll({where: {templateUserUserID:  req.params.userid}, include: [{model: Product}]})
    res.status(201).send(cart);
}))

module.exports = Router;