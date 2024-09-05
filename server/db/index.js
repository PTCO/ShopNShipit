const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgresql://Test_DB_owner:D4oCfJBrjX9e@ep-delicate-paper-a5lf6r2h.us-east-2.aws.neon.tech/Test_DB?sslmode=require', { logging: false}) // Leave logging as false

const db = { // Do not change
    sequelize,
    Sequelize,
    models:{}
}

// Add Models
db.models.templateUser = require('./models/User')(sequelize); 
db.models.Filters = require('./models/Filters')(sequelize); 
db.models.Product = require('./models/Product')(sequelize); 
db.models.UserSessions = require('./models/UserSessions')(sequelize); 
db.models.Reviews = require('./models/Review')(sequelize); 
db.models.Cart = require('./models/Cart')(sequelize); 
db.models.Orders = require('./models/Order')(sequelize); 
db.models.Payments = require('./models/Payment')(sequelize); 
db.models.Shipping = require('./models/Shipping')(sequelize); 
db.models.Delivery = require('./models/Delivery')(sequelize); 

module.exports = db;