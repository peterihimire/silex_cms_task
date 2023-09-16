import { Router } from "express";
import {
  create_logo,
  get_all_logos,
  get_logo,
  update_logo,
  delete_logo,
} from "../controllers/logo-controller";
const router = Router();

router.post("/create", create_logo);
router.get("/get_logo/:l_id", get_logo);
router.get("/get_all_logos", get_all_logos);
router.patch("/update/:l_id", update_logo);
router.delete("/delete/:l_id", delete_logo);

export default router;
