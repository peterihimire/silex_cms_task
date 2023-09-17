import { Router } from "express";
import {
  create_menu,
  get_all_menus,
  get_menu,
  update_menu,
  delete_menu,
} from "../controllers/menu-controller";
const router = Router();

router.post("/create", create_menu);
router.get("/get_menu/:m_id", get_menu);
router.get("/get_all_menus", get_all_menus);
router.patch("/update/:m_id", update_menu);
router.delete("/delete/:m_id", delete_menu);

export default router;
