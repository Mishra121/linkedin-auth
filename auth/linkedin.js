var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');

var User = require('../models/user');
var key = require('../config/key');
var init = require('./init'); // Used to serialize and deserialize user

passport.use(
    new LinkedInStrategy({
        consumerKey: key.ClientID,
        consumerSecret: key.ClientSecret,
        callbackURL: key.callbackURL,
        profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'picture-url'],
        proxy:true
    },
    // this functions collect tokens and profile info
        async (token, tokenSecret, profile, done) => {
            const existingUser = await User.findOne({someID: profile.id})

            if(existingUser){
                // already have record
                return done(null, existingUser);
            }

            const user = await new User(
                { 
                    someID: profile.id, 
                    name: profile.displayName,
                    email: profile._json.emailAddress,
                    headline: profile._json.headline,
                    pictureUrl: profile._json.pictureUrl
                }).save()
            done(null, user);
        }
    )
)

init();

module.exports = passport;
