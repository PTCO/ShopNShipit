/* NPM */
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(expressSession.Store);

/* Passport Setup */
const passport = require('passport');
const passportSetup = require('./passport/config');

require('dotenv').config();

/* Route Imports */
const Users = require('./routes/Users');
const Search = require('./routes/Search');
const Orders = require('./routes/Orders');
const Cart = require('./routes/Cart');
const Payments = require('./routes/Payment');
const Shipping = require('./routes/Shipping');

/* Sequelize */
const db = require('./db');

const app = express();

/* Express App Config & Middleware */
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors({
  origin: process.env.BASE_URL, // Change origin as needed
  credentials: true // Leave setting on true
}));

/* Cookie Session Config */
const sequelizeSessionStore = new SequelizeStore({
  db: db.sequelize,
  tableName: 'UserSessions',
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 *60 * 1000
})
app.use(expressSession({
  secret: process.env.SECRET,
  key: 'sid',
  store: sequelizeSessionStore,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: "auto",
    httpOnly: false
  }
}))

// /* Passport Serialization */
app.use(passport.initialize());

/* Session Store & Sequelize Syncs */
sequelizeSessionStore.sync();
(async()=>{
  await db.sequelize.sync();
})()

/* Routes */
app.use('/', Users);
app.use('/Search', Search);
app.use('/Orders', Orders);
app.use('/Payments', Payments);
app.use('/Cart', Cart);
app.use('/Shipping', Shipping);

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

/* Error handler */
app.use(function(err, req, res, next) {
  console.log(err, err.name);
  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(401).send(err.errors.map( err => err.message));
  }
  if(err.status === 404) return res.status(404).send([err.message]);
  
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status || 500).send([err.message]);
});

app.listen(process.env.PORT, ()=>{
  console.log('Listeningon PORT' + process.env.PORT)
})

module.exports = app;
