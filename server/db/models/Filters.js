const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Filters extends Sequelize.Model{}
    Filters.init({
        ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        PriceLow: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            defaultValue: 0
        },
        PriceHigh: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            defaultValue: 0
        },
        Rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        PriceStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        RatingStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {sequelize})
    return Filters;
}