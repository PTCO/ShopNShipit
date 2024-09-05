const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Order extends Sequelize.Model{}
    Order.init({
        Order_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Thumbnail: {
            type: Sequelize.STRING(100000),
            allowNull: false
        },
        ItemsCount: {
            type: Sequelize.INTEGER(),
            allowNull: false
        },
        ShippingPrice: {
            type: Sequelize.FLOAT(),
            allowNull: false
        },
        Tax: {
            type: Sequelize.FLOAT(),
            allowNull: false
        },
        SubTotal: {
            type: Sequelize.FLOAT(),
            allowNull: false
        },
        Cart: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            allowNull: false
        },
        Delivery: {
            type: Sequelize.JSON,
            allowNull: false
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Processing"
        }
    }, {sequelize});
    return Order;
}