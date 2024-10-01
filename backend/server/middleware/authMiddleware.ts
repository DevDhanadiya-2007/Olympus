import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;

    if (!token) {
        res.locals.isAuthenticated = false;
        return res.redirect("/api/auth/user-warning");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        res.locals.isAuthenticated = true;
        next();
    } catch (err) {
        res.locals.isAuthenticated = false;
        return res.status(403).json({ message: 'Error, unauthorized' });
    }
};

export default authMiddleware;
