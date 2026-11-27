import type { CheckoutItem } from "../App";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  checkout: CheckoutItem[];
  removeFromCheckout: (productId: number) => void;
  emptyCheckout: () => void;
}

function CheckoutContainer({
  checkout,
  removeFromCheckout,
  emptyCheckout
}: CheckoutContainerProps) {
  
  const total = checkout.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <div>
    <h2>Checkout</h2>

    {checkout.length === 0 ? (
<p>Cart Empty</p>
) : (
        <div>
        {checkout.map((item) => (
        <CheckoutCard
         key={item.product.id}
            item={item}
            removeFromCheckout={removeFromCheckout}/>

))}
<button onClick={emptyCheckout}>
            Empty Checkout
          </button></div>
    )}
<h3>Grand Total: ${total.toFixed(2)}</h3>
</div>
  );}

export default CheckoutContainer;
