import type { Response } from "express";
import * as productService from "../services/product-service";

export const getProducts = async (res: Response) => {
	try {
		const products = await productService.getProducts();
		res.status(200).json(products);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch products" });
	}
};
