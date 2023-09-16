import { Router } from "express";
import { create_sub_menu } from "../controllers/sub-menu-controller";
const router = Router();

router.post("/create", create_sub_menu);

export default router;
