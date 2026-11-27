import type { CheckoutItem } from "./ThriftHappensApp";

interface CheckoutCardProps {
    item: CheckoutItem;
    removeFromCheckout: (productId: number) => void;
}

function CheckoutCard({
    item,
    removeFromCheckout
}: CheckoutCardProps) {

    const subtotal = item.product.price * item.quantity;

    return (
        <div>
            <img
                src={item.product.image.replace(
                    "src/assets/images/",
                    "/images/"
                )}
                alt={item.product.name}
                width="100"
            />

            <h3>{item.product.name}</h3>

            <p>
                Price: ${item.product.price.toFixed(2)}
            </p>

            <p>Quantity: {item.quantity}</p>

            <p>Subtotal: ${subtotal.toFixed(2)}</p>

            <button
                onClick={() =>
                    removeFromCheckout(item.product.id)
                }
            >
                Remove
            </button>
        </div>
    );
}

export default CheckoutCard;