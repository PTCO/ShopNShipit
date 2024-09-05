const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Product extends Sequelize.Model{}
    Product.init({
        Product_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Title: {
            type: Sequelize.STRING(),
            allowNullL: false,
            validate: {
                len: {
                    args: [5, 60],
                    msg: "Product description should be between 5-60 characters long"
                }
            }
        },
        Portrait: {
            type: Sequelize.ARRAY(Sequelize.STRING(100000)),
            allowNull: false
        },
        Description: {
            type: Sequelize.STRING(),
            allowNullL: false,
            validate: {
                len: {
                    args: [5, 300],
                    msg: "Product description should be between 5-300 characters long"
                }
            }
        },
        Highlight: {
            type: Sequelize.STRING(),
            defaultValue: "",
            validate: {
                len: {
                    args: [0, 20],
                    msg: "Highhlight should be between 0-20 characters long"
                }
            }
        },
        Stock: {
            type: Sequelize.INTEGER(),
            allowNull: false
        },
        Price: {
            type: Sequelize.FLOAT(),
            defaultValue: 0.00
        },
        Rating: {
            type: Sequelize.INTEGER(),
            defaultValue: 0
        },
        reviewCount: {
            type: Sequelize.INTEGER(),
            defaultValue: 0
        },
    }, {sequelize})
    return Product;
}