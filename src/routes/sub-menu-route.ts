import { Router } from "express";
import {
  create_sub_menu,
  get_all_sub_menus,
  get_sub_menu,
  update_sub_menu,
  delete_sub_menu,
} from "../controllers/sub-menu-controller";
const router = Router();

router.post("/create", create_sub_menu);
router.get("/get_sub-menu/:sm_id", get_sub_menu);
router.get("/get_all_sub-menus", get_all_sub_menus);
router.patch("/update/:sm_id", update_sub_menu);
router.delete("/delete/:sm_id", delete_sub_menu);

export default router;
