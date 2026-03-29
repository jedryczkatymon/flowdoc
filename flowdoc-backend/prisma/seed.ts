import { prisma } from "../lib/prisma";

async function seedDatabase() {
	const products = await prisma.products.createMany({
		data: [
			{
				name: "Bolognese",
				price: 25.99,
				image_url:
					"https://www.tamingtwins.com/wp-content/uploads/2025/01/spaghetti-bolognese-10.jpg",
			},
			{
				name: "Beer",
				price: 29.99,
				image_url:
					"https://as1.ftcdn.net/v2/jpg/01/25/19/40/1000_F_125194069_fkw8dZvCas59u6uLAWe1KNSRljuixP9S.jpg",
			},
			{
				name: "Pancakes",
				price: 79.99,
				image_url:
					"https://www.foodandwine.com/thmb/HVbJsZlSG7BQF1mif2Z5tZICM8g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Buttermilk-Pancakes-FT-RECIPE1222-5589088e52c94e6f8a610b4393196fbb.jpg",
			},
		],
	});

	console.log(`Seeded ${products.count} products`);
}
seedDatabase().catch((e) => {
	console.error(e);
	process.exit(1);
});
