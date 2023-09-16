import { Router } from "express";
import { create_menu } from "../controllers/menu-controller";
const router = Router();

router.post("/create", create_menu);

export default router;
