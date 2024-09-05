const Sequelize = require('sequelize'); 

module.exports = (sequelize) => {
    class Payment extends Sequelize.Model{}
    Payment.init({
        Payment_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        CardHolder: {
            type: Sequelize.STRING(),
            allowNull: false,
        },
        Type: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        Expiration: {
            type: Sequelize.STRING(),
            allowNull: false
        },
        Number: {
            type: Sequelize.STRING(),
            allowNull: false,
        },
        Last4: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            validate: {
                len: {
                    args: [1, 4],
                    msg: "Card number must be between 1-4 digits"
                }
            }
        },
        Security: {
            type: Sequelize.STRING(),
            allowNull: false,
        },
        Current: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {sequelize});
    return Payment;
}