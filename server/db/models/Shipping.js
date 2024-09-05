const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    class Shipping extends Sequelize.Model{}
    Shipping.init({
        Address_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        AddressOne: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        AddressTwo: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        City: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        State: {
            type: Sequelize.STRING(),
            allowNull: false,
        },
        ZipCode: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            validate: {
                len: {
                    args: [5],
                    msg: "Zip code must contain 5 digits"
                }
            }
        },
        Current: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    }, {sequelize})
    return Shipping;
}