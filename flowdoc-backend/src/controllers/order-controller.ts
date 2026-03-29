import type { Request, Response } from "express";
import * as orderService from "../services/orders-service";

export const getOrders = async (_req: Request, res: Response) => {
	try {
		const orders = await orderService.getAllOrders();
		res.status(200).json({ orders });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch orders" });
	}
};

export const createOrder = async (req: Request, res: Response) => {
	try {
		const order = await orderService.createOrder(req.body);
		res.status(201).json({
			success: true,
			orderId: order.id,
		});
	} catch (err) {
		console.error("Prisma error:", err);
		res.status(500).json({ message: "Failed to create order" });
	}
};
