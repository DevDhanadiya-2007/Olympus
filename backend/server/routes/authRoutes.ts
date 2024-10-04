import express from "express";
import passport from "passport";
import { signup, login, checkAuth, logOut, googleCallback } from "../controllers/authController";

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get("/checkAuth", checkAuth)
router.post('/logout', logOut)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

export default router