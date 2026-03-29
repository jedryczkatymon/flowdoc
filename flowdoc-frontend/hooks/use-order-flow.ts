import { useState } from "react";

export function useOrderFlow() {
	const [step, setStep] = useState<1 | 2>(1);
	const [cart, setCart] = useState<Record<string, number>>({});
	const [customer, setCustomer] = useState({ name: "", address: "" });
	const [isLoading, setIsLoading] = useState(false);

	const updateQuantity = (productId: string, quantityChange: number) => {
		setCart((previousQuantity) => ({
			...previousQuantity,
			[productId]: Math.max(
				0,
				(previousQuantity[productId] ?? 0) + quantityChange,
			),
		}));
	};

	const totalItems = Object.values(cart).reduce(
		(sum, quantity) => sum + quantity,
		0,
	);

	const submitOrder = async () => {
		const items = Object.entries(cart)
			.filter(([_, quantity]) => quantity > 0)
			.map(([productId, quantity]) => ({ productId, quantity }));

		if (items.length === 0) return;

		setIsLoading(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customer_name: customer.name,
					customer_address: customer.address,
					items,
				}),
			});

			if (!response.ok) {
				throw new Error("Wystąpił problem z API podczas składania zamówienia.");
			}

			alert("Zamówienie złożone!");
			setCart({});
			setCustomer({ name: "", address: "" });
			setStep(1);
		} catch (error) {
			console.error("Błąd zamówienia:", error);
			alert("Nie udało się złożyć zamówienia. Spróbuj ponownie.");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		step,
		setStep,
		cart,
		updateQuantity,
		customer,
		setCustomer,
		isPending: isLoading,
		totalItems,
		submitOrder,
	};
}
