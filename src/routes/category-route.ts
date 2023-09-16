import { Router } from "express";
import { create_category } from "../controllers/category-controller";
const router = Router();

router.post("/create", create_category);

export default router;
