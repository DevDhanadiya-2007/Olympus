import express from "express";
import next from "next";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import walletRoutes from './routes/walletRoutes';
import authRoutes from "./routes/authRoutes";
import connectDB from "./utils/database";
import './utils/passport';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const initServer = async () => {
    await app.prepare();
    const server = express();

    // Middleware
    server.use(cookieParser());
    server.use(express.json({ limit: '10kb' })); // Limit the body size to prevent large payloads
    server.use(cors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true,
    }));
    server.use(morgan('dev'));

    // Session management
    server.use(session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,  // Do not save uninitialized sessions
        store: MongoStore.create({
            mongoUrl: process.env.DB_URI,
            collectionName: 'sessions',
            ttl: 30 * 24 * 60 * 60, // Set session TTL to 30 days
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        },
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    await connectDB();

    // Routes
    server.use('/api/auth', authRoutes);
    server.use('/api/wallet', walletRoutes);
    server.all("*", (req, res) => handle(req, res));

    server.listen(PORT, () => {
        console.log(`Server is listening on PORT = ${PORT}`);
    });
};

initServer().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});
