import { Router } from "express";
import { create_flipbox } from "../controllers/flipbox-controller";
const router = Router();

router.post("/create", create_flipbox);

export default router;
