import { Router } from "express";
import { create_slider } from "../controllers/slider-controller";
const router = Router();

router.post("/create", create_slider);

export default router;
