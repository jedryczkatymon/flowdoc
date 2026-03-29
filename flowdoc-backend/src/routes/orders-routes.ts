import { Router } from "express";
import * as orderController from "../controllers/order-controller";
import { adminAuth } from "../middleware/adminAuth-middleware";

const router: ReturnType<typeof Router> = Router();

router.get("/admin/orders", adminAuth, orderController.getOrders);
router.post("/orders", orderController.createOrder);

export default router;
