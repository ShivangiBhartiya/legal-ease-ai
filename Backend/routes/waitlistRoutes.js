import express from "express";
import { joinWaitlist } from "../controllers/waitlistController.js";

const router = express.Router();

router.post("/joinwaitlist", joinWaitlist);

export default router;
