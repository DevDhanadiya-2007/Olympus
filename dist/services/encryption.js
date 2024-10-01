"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptMnemonic = exports.encryptMnemonic = void 0;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-gcm';
const KEY_LENGTH = 32;
const IV_LENGTH = 12;
const encryptMnemonic = (mnemonic, encryptionKey) => {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, encryptionKey, iv);
    let encrypted = cipher.update(mnemonic, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag();
    return {
        iv: iv.toString('base64'),
        encryptedData: encrypted,
        authTag: authTag.toString('base64')
    };
};
exports.encryptMnemonic = encryptMnemonic;
const decryptMnemonic = (encryptedData, iv, authTag, encryptionKey) => {
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, encryptionKey, Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(authTag, 'base64'));
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decryptMnemonic = decryptMnemonic;
