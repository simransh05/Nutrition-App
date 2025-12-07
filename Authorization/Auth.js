const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../model/user');
const bcrypt = require('bcrypt')
require('dotenv').config();

// local strategy
passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({
                googleId: profile.id
            })
            if (user) {
                return cb(null, user);
            }
            user = await User.create({
                googleaccessToken: accessToken,
                googleId: profile.id,
                username: profile.displayName,
                isadmin: false
            })
            return cb(null, user);
        }
        catch (err) {
            cb(err, false);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id)
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});



module.exports = passport;