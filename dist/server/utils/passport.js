"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const model_1 = require("../model/model");
dotenv_1.default.config();
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google OAuth credentials");
}
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await model_1.User.findOne({ googleId: profile.id });
        if (!user) {
            const email = profile.emails?.[0]?.value;
            if (!email) {
                console.error("No email found in Google profile");
                return done(new Error("No email found in Google profile"), undefined);
            }
            user = await model_1.User.findOne({ email });
            if (!user) {
                user = new model_1.User({ googleId: profile.id, email });
            }
            else {
                user.googleId = profile.id;
            }
            await user.save();
        }
        return done(null, user);
    }
    catch (error) {
        console.error("Error in Google authentication strategy:", error);
        return done(error, undefined);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await model_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        console.error("Error deserializing user:", error);
        done(error, undefined);
    }
});
exports.default = passport_1.default;
