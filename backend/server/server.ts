import express from "express";
import next from "next";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session"
import passport from "passport";
import MongoStore from "connect-mongo";
import walletRoutes from './routes/walletRoutes';
import authRoutes from "./routes/authRoutes";
import connectDB from "./utils/database";
import './utils/passport';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const initServer = async () => {
    await app.prepare();
    const server = express();

    server.use(cookieParser());
    server.use(express.json());
    server.use(cors({ origin: '*', credentials: true }));
    server.use(morgan('dev'));

    server.use(session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URI,
            collectionName: 'sessions'
        }),
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    await connectDB();

    server.use('/api/auth', authRoutes);
    server.use('/api/wallet', walletRoutes);
    server.all("*", (req, res) => handle(req, res));

    server.listen(PORT, () => {
        console.log(`Server is listening on PORT = ${PORT}`)
    });
};

initServer().catch((error) => {
    console.error("Error starting server:", error);
});
