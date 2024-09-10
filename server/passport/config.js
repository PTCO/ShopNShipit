const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const twitterStrategy = require('passport-twitter');
const cookie = require('js-cookie');
require('dotenv').config();

/* Sequelize */
const db = require('../db')
const { templateUser } = db.models;

/* Google Passport Config */ 
passport.use(new googleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `https://shopnshipit-production.up.railway.app/Google/Callback`
    },
    async function(accessToken, refreshToken, profile, cb) {
        try {            
            const userCheck = await templateUser.findOne({ where: { Username: profile.displayName.replace(" ", "")}});
            if(userCheck) {
                return cb(null, userCheck);
            }
            const user = await templateUser.create({
                Username: profile.displayName.replace(" ", ""),
                Email: profile._json.email,
                Password: process.env.GOOGLE_AUTH_PWD, // Passwords Pre-defined in environment variables
                confirmedPassword: process.env.GOOGLE_AUTH_PWD,
                googleAuth: true,
            })
            cb(null, user);
        } catch (error) {
            cb(null, error);
        }
    }
))

/* Twitter Passport Config */
passport.use(new twitterStrategy(
    {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        includeEmail: true, // Config option required - Do not change
        callbackURL: `https://shopnshipit-production.up.railway.app/Twitter/Callback`
    },
    async function(token, tokenSecret, profile, cb) {
        try {
            const userCheck = await templateUser.findOne({ where: { Username: profile.displayName.replace(" ", "")}});
            if(userCheck) return cb(null, userCheck);
            const user = await templateUser.create({
                Username: profile.username,
                Email: profile.emails[0].value,
                Portrait: profile.photos[0].value,
                Password: process.env.TWITTER_AUTH_PWD, // Passwords Pre-defined in environment variables
                confirmedPassword: process.env.TWITTER_AUTH_PWD,
            })
            cb(null, user);
        } catch (error) {
            cb(null, error);
        }
    }
))