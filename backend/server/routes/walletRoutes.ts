import express from "express"

import { mnemonicService } from "../controllers/serviceController"
import authMiddleware from "../middleware/authMiddleware"

const router = express.Router()

router.use(authMiddleware)
router.post("/generate-mnemonic", mnemonicService)

export default router