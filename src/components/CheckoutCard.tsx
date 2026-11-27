import type { CheckoutItem } from "../App";

interface CheckoutCardProps {
    item: CheckoutItem;
    removeFromCheckout: (productId: number) => void;
}

function CheckoutCard({ item, removeFromCheckout }: CheckoutCardProps) {
return (
<div>
    <h3>{item.product.name}</h3>
    <img
    src={"/images/product-" + (item.product.id + 1) + ".png"}
    alt={item.product.name}
width="100"

/>
    <p>Unit Price: ${item.product.price.toFixed(2)}</p>
    <p>Quantity: {item.quantity}</p>
    <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
    <button onClick={() => removeFromCheckout(item.product.id)}>
    Remove
    </button>
    </div>
);}


export default CheckoutCard;