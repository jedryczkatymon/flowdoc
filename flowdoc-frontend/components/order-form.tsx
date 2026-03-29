import type { Products } from "@flowdoc/backend/lib/shared-types";
import { useOrderFlow } from "../hooks/use-order-flow";
import { ProductItem } from "./product-item";

export default function OrderForm({ products }: { products: Products[] }) {
	const {
		step,
		setStep,
		cart,
		updateQuantity,
		customer,
		setCustomer,
		isPending,
		totalItems,
		submitOrder,
	} = useOrderFlow();

	if (step === 1) {
		return (
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Krok 1: Wybierz produkty</h2>
				{products.map((p) => (
					<ProductItem
						key={p.id}
						product={p}
						quantity={cart[p.id] || 0}
						onUpdate={updateQuantity}
					/>
				))}
				<button
					type="button"
					onClick={() => setStep(2)}
					disabled={totalItems === 0}
					className="w-full mt-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
				>
					Dalej
				</button>
			</div>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submitOrder();
			}}
			className="space-y-4"
		>
			<h2 className="text-xl font-semibold">Krok 2: Twoje dane</h2>
			<input
				required
				placeholder="Imię"
				value={customer.name}
				onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
				className="w-full border p-2 rounded"
			/>
			<input
				required
				placeholder="Adres"
				value={customer.address}
				onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
				className="w-full border p-2 rounded"
			/>
			<div className="flex gap-2">
				<button
					type="button"
					onClick={() => setStep(1)}
					className="w-1/3 py-2 bg-gray-500 text-white rounded"
				>
					Wstecz
				</button>
				<button
					type="submit"
					disabled={isPending}
					className="w-2/3 py-2 bg-green-600 text-white rounded"
				>
					{isPending ? "Przetwarzanie..." : "Zamawiam"}
				</button>
			</div>
		</form>
	);
}
