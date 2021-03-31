import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { User } from "../models/user";

passport.serializeUser<any, any>((req, user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/login/callback",
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
        return done(undefined, existingUser);
    }
    const user = await new User({ googleId: profile.id }).save();
    return done(undefined, user);
}));

export { passport };