import { useQuery } from "@tanstack/react-query";
import OrderForm from "../components/order-form";

export default function HomePage() {
	const { data: products = [] } = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await fetch("http://localhost:4000/products");
			if (!res.ok) throw new Error("Failed to fetch");
			return res.json();
		},
	});

	return (
		<main className="max-w-md mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Zamów jedzenie</h1>
			<OrderForm products={products} />
		</main>
	);
}
