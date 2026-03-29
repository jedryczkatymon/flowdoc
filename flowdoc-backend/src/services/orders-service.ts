import { prisma } from "../../lib/prisma";

type OrderPayload = {
	customer_name: string;
	customer_address: string;
	items: { productId: string; quantity: number }[];
};

export const getAllOrders = async () => {
	return prisma.orders.findMany({
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			created_at: "desc",
		},
	});
};

export const createOrder = async (payload: OrderPayload) => {
	return prisma.orders.create({
		data: {
			customer_name: payload.customer_name,
			customer_address: payload.customer_address,
			orderItems: {
				create: payload.items.map((item) => ({
					product_id: item.productId,
					quantity: item.quantity,
				})),
			},
		},
	});
};
