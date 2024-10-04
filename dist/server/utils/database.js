"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const DB_URI = process.env.DB_URI;
    try {
        await mongoose_1.default.connect(DB_URI).then(() => {
            console.log("DB connected");
        });
    }
    catch (error) {
        console.log(`Couldn't connect to DB ${error}`);
        process.exit(1);
    }
};
exports.default = connectDB;
