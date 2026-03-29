import type { Products } from "@flowdoc/backend/lib/shared-types";
import QuantityButton from "./quantity-button";

interface Props {
	product: Products;
	quantity: number;
	onUpdate: (id: string, quantityChange: number) => void;
}

export function ProductItem({ product, quantity, onUpdate }: Props) {
	return (
		<div className="flex justify-between items-center border p-4 rounded">
			<img
				src={product.image_url}
				alt={product.name}
				className="size-20 object-cover"
			/>
			<div className="flex flex-col items-start">
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-gray-600">{product.price} zł</p>
			</div>
			<div className="flex items-center space-x-2">
				<QuantityButton
					productId={product.id}
					quantity={quantity}
					label="-"
					onUpdate={(id, quantityChange) => onUpdate(id, quantityChange)}
				/>
				<span>{quantity}</span>
				<QuantityButton
					productId={product.id}
					quantity={quantity}
					label="+"
					onUpdate={(id, quantityChange) => onUpdate(id, quantityChange)}
				/>
			</div>
		</div>
	);
}
