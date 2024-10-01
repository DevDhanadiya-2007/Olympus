"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.logOut = exports.checkAuth = exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const model_1 = require("../model/model");
const JWT_SECRET = process.env.JWT_SECRET;
const signup = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await model_1.User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new model_1.User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};
exports.signup = signup;
const googleCallback = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'User authentication failed' });
    }
    const user = req.user;
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
    });
    res.redirect(`/`);
};
exports.googleCallback = googleCallback;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        res.status(200).json({ message: 'Log In successful', isAuthenticated: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to Log In' });
    }
};
exports.login = login;
const checkAuth = async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(200).json({ isAuthenticated: false });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ isAuthenticated: true });
    }
    catch (err) {
        return res.status(200).json({ isAuthenticated: false });
    }
};
exports.checkAuth = checkAuth;
const logOut = async (req, res) => {
    res.clearCookie('authToken');
    return res.status(200).json({ message: 'Logged out successfully' });
};
exports.logOut = logOut;
