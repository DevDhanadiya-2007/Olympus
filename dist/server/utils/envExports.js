"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEV_URL_CALLBACK = exports.PROD_URL_CALLBACK = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PROD_URL_CALLBACK = process.env.PROD_URL_CALLBACK;
exports.PROD_URL_CALLBACK = PROD_URL_CALLBACK;
const DEV_URL_CALLBACK = process.env.DEV_URL_CALLBACK;
exports.DEV_URL_CALLBACK = DEV_URL_CALLBACK;
