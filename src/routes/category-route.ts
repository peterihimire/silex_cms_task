import { Router } from "express";
import {
  create_category,
  get_all_categories,
  get_category,
  update_category,
  delete_category,
} from "../controllers/category-controller";
const router = Router();

import { verifySessionAndAuthorization } from "../middlewares/verify-session";

router.post("/create", verifySessionAndAuthorization, create_category);
router.get(
  "/get_category/:cat_id",
  verifySessionAndAuthorization,
  get_category
);
router.get(
  "/get_all_categories",
  verifySessionAndAuthorization,
  get_all_categories
);
router.patch("/update/:cat_id", verifySessionAndAuthorization, update_category);
router.delete(
  "/delete/:cat_id",
  verifySessionAndAuthorization,
  delete_category
);

export default router;
