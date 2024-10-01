"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get("/checkAuth", authController_1.checkAuth);
router.post('/logout', authController_1.logOut);
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'], }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), authController_1.googleCallback);
exports.default = router;
