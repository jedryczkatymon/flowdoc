export default function QuantityButton({
	productId,
	quantity,
	onUpdate,
	label,
}: {
	productId: string;
	quantity: number;
	label: string;
	onUpdate: (productId: string, quantityChange: number) => void;
}) {
	const isDecrease = label === "-";
	const disabled = isDecrease && quantity === 0;

	return (
		<div className="flex items-center space-x-2">
			<button
				type="button"
				onClick={() => onUpdate(productId, isDecrease ? -1 : 1)}
				className="px-3 py-1 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={disabled}
			>
				{label}
			</button>
		</div>
	);
}
