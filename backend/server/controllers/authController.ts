import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { User } from '../model/model';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const SALT_ROUNDS = 12;

const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const googleCallback = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ error: 'User authentication failed' });
    }

    const user = req.user as any;
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
    });
    res.redirect('/api/auth/google-auth-callback');
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: '/',
        });
        res.status(200).json({ message: 'Log In successful', isAuthenticated: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to Log In' });
    }
};

const checkAuth = async (req: Request, res: Response) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(200).json({ isAuthenticated: false });
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ isAuthenticated: true });
    } catch (error) {
        return res.status(200).json({ isAuthenticated: false });
    }
};

const logOut = async (req: Request, res: Response) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        path: '/',
    });
    return res.status(200).json({ message: 'Logged out successfully' });
};

export {
    signup,
    googleCallback,
    login,
    checkAuth,
    logOut,
};
