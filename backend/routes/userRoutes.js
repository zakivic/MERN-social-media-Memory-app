import express from "express";
const router = express.Router();

import { 
    signin, 
    signup, 
    googleAuthFindOrCreateUser, 
    getUser 
} from "../controllers/userController.js";

router.get("/:id", getUser);

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/google", googleAuthFindOrCreateUser);

export default router;