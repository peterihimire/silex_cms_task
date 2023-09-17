import { Router } from "express";
import {
  create_flipbox,
  get_all_flipboxes,
  get_flipbox,
  update_flipbox,
  delete_flipbox,
} from "../controllers/flipbox-controller";
const router = Router();

router.post("/create", create_flipbox);
router.get("/get_flipbox/:f_id", get_flipbox);
router.get("/get_all_flipboxes", get_all_flipboxes);
router.patch("/update/:f_id", update_flipbox);
router.delete("/delete/:f_id", delete_flipbox);

export default router;
