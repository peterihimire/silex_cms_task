import { Router } from "express";
import {
  create_category,
  get_all_categories,
  get_category,
  update_category,
  delete_category,
} from "../controllers/category-controller";
const router = Router();

router.post("/create", create_category);
router.get("/get_category/:cat_id", get_category);
router.get("/get_all_categories", get_all_categories);
router.patch("/update/:cat_id", update_category);
router.delete("/delete/:cat_id", delete_category);

export default router;
