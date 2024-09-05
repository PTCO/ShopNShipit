const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Cart extends Sequelize.Model{}
    Cart.init({
        Cart_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Quantity: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            defaultValue: 1
        }
    }, {sequelize});
    return Cart;
}
