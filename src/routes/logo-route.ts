import { Router } from "express";
import { create_logo } from "../controllers/logo-controller";
const router = Router();

router.post("/create", create_logo);

export default router;
