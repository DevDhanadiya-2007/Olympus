"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const walletRoutes_1 = __importDefault(require("./routes/walletRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const database_1 = __importDefault(require("./utils/database"));
require("./utils/passport");
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const initServer = async () => {
    await app.prepare();
    const server = (0, express_1.default)();
    // Middleware
    server.use((0, cookie_parser_1.default)());
    server.use(express_1.default.json({ limit: '10kb' }));
    server.use((0, cors_1.default)({
        origin: "*",
        credentials: true,
    }));
    server.use((0, morgan_1.default)('dev'));
    server.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.DB_URI,
            collectionName: 'sessions',
            ttl: 30 * 24 * 60 * 60,
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        },
    }));
    server.use(passport_1.default.initialize());
    server.use(passport_1.default.session());
    await (0, database_1.default)();
    server.use('/api/auth', authRoutes_1.default);
    server.use('/api/wallet', walletRoutes_1.default);
    server.all("*", (req, res) => handle(req, res));
    server.listen(PORT, () => {
        console.log(`Server is listening on PORT = ${PORT}`);
    });
};
initServer().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});
