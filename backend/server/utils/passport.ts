import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User, IUser } from "../model/model";

dotenv.config();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google OAuth credentials");
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const email = profile.emails?.[0]?.value;

                if (!email) {
                    console.error("No email found in Google profile");
                    return done(new Error("No email found in Google profile"), undefined);
                }

                user = await User.findOne({ email });

                if (!user) {
                    user = new User({ googleId: profile.id, email });
                } else {
                    user.googleId = profile.id;
                }
                await user.save();
            }

            return done(null, user);
        } catch (error) {
            console.error("Error in Google authentication strategy:", error);
            return done(error, undefined);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, (user as IUser)._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.error("Error deserializing user:", error);
        done(error, undefined);
    }
});

export default passport;