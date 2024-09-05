const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize) => {
    class templateUser extends Sequelize.Model{}
    templateUser.init({
        User_ID: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        Username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A username is required'
                },
                notEmpty: {
                    msg: 'Please provide a username'
                },
                len: {
                    args: [8, 20],
                    msg: 'Username should be between 6 & 14 characters'
                }
            },
            unique: {
                args: true,
                msg: 'Username not available'
            }
        },
        Portrait: {
            type: Sequelize.STRING(10485760),
            allowNull: false,
            defaultValue: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
            validate: {
                notNull: 'Portrait is required'
            }
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A email is required'
                }
            },
            unique: {
                args: true,
                msg: 'Email arleady in use'
            }
        },
        Password: {
            type: Sequelize.VIRTUAL,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A password is required'
                },
                notEmpty: {
                    msg: 'Please provide a password'
                },
                len: {
                    args: [8, 16],
                    msg: 'Password need to be 8-16 characters'
                }
            }
        },
        confirmedPassword: {
            type: Sequelize.STRING,
            allowNull: false,
            set(val) {
                if(val === this.Password && val){
                    const hashPassword = bcrypt.hashSync(val, parseInt(process.env.SALT));
                    this.setDataValue('confirmedPassword', hashPassword)
                }
            },
            validate: {
                notNull: {
                    msg: 'Both passwords must match'
                },
            }
        },
        googleAuth: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        twitterAuth: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    },{sequelize})
    return templateUser;
}