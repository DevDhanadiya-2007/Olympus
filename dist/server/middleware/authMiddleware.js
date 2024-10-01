"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        res.locals.isAuthenticated = false;
        return res.redirect("/api/auth/user-warning");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.locals.isAuthenticated = true;
        next();
    }
    catch (err) {
        res.locals.isAuthenticated = false;
        return res.status(403).json({ message: 'Error, unauthorized' });
    }
};
exports.default = authMiddleware;
