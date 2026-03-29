import { Router } from "express";
import * as productController from "../controllers/product-controller";

const router: ReturnType<typeof Router> = Router();

router.get("/products", productController.getProducts);

export default router;
