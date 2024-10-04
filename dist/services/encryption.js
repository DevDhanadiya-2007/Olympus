"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKey = exports.decrypt = exports.encrypt = exports.createHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const generateKey = () => {
    return crypto_1.default.randomBytes(KEY_LENGTH).toString('hex');
};
exports.generateKey = generateKey;
const createHash = async (key) => {
    return crypto_1.default.createHash('sha256').update(key).digest('hex');
};
exports.createHash = createHash;
const encrypt = (text, key) => {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const keyBuffer = Buffer.from(key, 'hex');
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${encrypted.toString('hex')}:${tag.toString('hex')}`;
};
exports.encrypt = encrypt;
const decrypt = (text, key) => {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.shift(), 'hex');
    const authTag = Buffer.from(parts.shift(), 'hex');
    const keyBuffer = Buffer.from(key, 'hex');
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString('utf8');
};
exports.decrypt = decrypt;
