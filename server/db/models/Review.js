const Sequelize = require('sequelize');
const moment = require('moment');

sentAt = () => {
    const date = moment(this.createAt).format('MMMM D, YYYY, h:mm a');
    return date;
}

module.exports = (sequelize) => {
    class Review extends Sequelize.Model{

    }
    Review.init({
        Review_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Summary: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: "Please provide a sumary sentence for your review",
                len: {
                    args: [5, 30],
                    msg: "Summary must be between 5-30 characters"
                }
            }
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Review: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: "Please provide an detailed review",
                len: {
                    args: [5, 500],
                    msg: 'Review must be between 5-500 characters'
                }
            }
        },
        Rating: {
            type: Sequelize.INTEGER(),
            allowNull: false,
            validate: {
                notNull: "Please provide an rating"
            },
            defaultValue: 0
        },
        Time: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: sentAt()
        }
    }, {sequelize})
    return Review;
}