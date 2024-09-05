const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class UserSessions extends Sequelize.Model{}
    UserSessions.init({
        sid: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        expires: {
            type: Sequelize.DATE,
            allowNull: true
        },
        data: Sequelize.JSON
    }, {sequelize});
    return UserSessions;
}