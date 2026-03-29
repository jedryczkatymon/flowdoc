import { prisma } from "../../lib/prisma";

export const getProducts = async () => {
	return await prisma.products.findMany();
};
