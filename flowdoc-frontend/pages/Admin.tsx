import type {
	Order_Items,
	Orders,
	Products,
} from "@flowdoc/backend/lib/shared-types";
import { useQuery } from "@tanstack/react-query";

type OrderWithItems = Orders & {
	orderItems: (Order_Items & {
		product: Products;
	})[];
};

export default function Admin() {
	const {
		data: orders = [],
		isLoading,
		isError,
		error,
	} = useQuery<OrderWithItems[]>({
		queryKey: ["orders"],
		queryFn: async () => {
			const res = await fetch("http://localhost:4000/admin/orders", {
				headers: {
					"x-admin-token": "supersecretadmintoken123",
				},
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(
					errorData.message || "Wystąpił problem z pobraniem danych",
				);
			}

			const data = await res.json();
			return data.orders;
		},
	});

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">
				Panel Administratora - Zamówienia
			</h1>

			{isLoading ? (
				<p className="text-gray-500">Ładowanie danych...</p>
			) : isError ? (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					<strong>Błąd autoryzacji: </strong> {error.message}
				</div>
			) : orders.length === 0 ? (
				<p className="text-gray-500">Brak zamówień w systemie.</p>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-gray-500 text-white border-b">
								<th className="p-3">ID / Data</th>
								<th className="p-3">Klient i Adres</th>
								<th className="p-3">Zamówione produkty</th>
								<th className="p-3">Suma</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								const totalSum = order.orderItems.reduce(
									(sum, item) => sum + item.product.price * item.quantity,
									0,
								);

								return (
									<tr key={order.id} className="border-b hover:bg-gray-200">
										<td className="p-3 align-top">
											<div className="text-sm font-mono text-gray-500">
												#{order.id.slice(0, 8)}...
											</div>
											<div className="text-sm">
												{new Date(order.created_at).toLocaleString("pl-PL")}
											</div>
										</td>
										<td className="p-3 align-top">
											<div className="font-medium">{order.customer_name}</div>
											<div className="text-sm text-gray-600">
												{order.customer_address}
											</div>
										</td>
										<td className="p-3 align-top">
											<ul className="text-sm space-y-1">
												{order.orderItems.map((item) => (
													<li key={item.id}>
														<span className="font-medium">
															{item.quantity}x
														</span>{" "}
														{item.product.name}{" "}
														<span className="text-gray-500">
															({item.product.price} zł/szt)
														</span>
													</li>
												))}
											</ul>
										</td>
										<td className="p-3 align-top font-bold text-lg">
											{totalSum.toFixed(2)} zł
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
