import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../model/model";

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback",
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    return done(new Error("No email found"), undefined);
                }

                user = await User.findOne({ email });

                if (!user) {
                    user = new User({ googleId: profile.id, email });
                    await user.save();
                } else {
                    user.googleId = profile.id;
                    await user.save();
                }
            }

            return done(null, user);
        } catch (error) {
            return done(error, undefined);
        }
    }
));

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user || undefined);
    } catch (error) {
        done(error, undefined);
    }
});
