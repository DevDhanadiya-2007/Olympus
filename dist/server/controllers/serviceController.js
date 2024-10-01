"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mnemonicService = void 0;
const mnemonic_1 = __importDefault(require("../../services/mnemonic"));
const mnemonicService = async (req, res) => {
    if (!res.locals.isAuthenticated) {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    try {
        const response = await (0, mnemonic_1.default)();
        res.status(200).json({
            message: "Generate Success",
            mnemonic: response?.mnemonic,
            publicKey: response?.publicKey
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate mnemonic" });
    }
};
exports.mnemonicService = mnemonicService;
