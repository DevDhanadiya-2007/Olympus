"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mnemonicService = void 0;
const mnemonic_1 = __importDefault(require("../../services/mnemonic"));
const encryption_1 = require("../../services/encryption");
const mnemonicService = async (req, res) => {
    try {
        const response = await (0, mnemonic_1.default)();
        const key = (0, encryption_1.generateKey)();
        const encryptedMnemonic = (0, encryption_1.encrypt)(response.mnemonic, key);
        res.status(200).json({
            message: "Generation Success",
            mnemonic: response.mnemonic,
            publicKey: response.publicKey,
            encryptedMnemonic,
            key
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate mnemonic" });
    }
};
exports.mnemonicService = mnemonicService;
