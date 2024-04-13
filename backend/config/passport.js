const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false, req.flash('error', 'No user found.'));
            }
            if (!await user.comparePassword(password)) {
                return done(null, false, req.flash('error', 'Wrong password.'));
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
