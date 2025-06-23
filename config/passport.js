const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const { User } = require('../models/user');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['user:email']
},
    async (accessToken, refreshToken, profile, done) => {
        const [user] = await User.findOrCreate({
            where: { githubId: profile.id },
            defaults: {
                username: profile.username,
                email: (profile.emails && profile.emails[0] && profile.emails[0].value) || null,
            },
        });
        return done(null, user);
    }
));
