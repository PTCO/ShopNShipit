const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Delivery extends Sequelize.Model{}
    Delivery.init({
        Option_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Window: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Cost: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {sequelize})
    return Delivery;
}