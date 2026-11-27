import { useState } from "react";
import { products } from "./data/data";
import type { ClothingProduct } from "./data/data";
import ItemContainer from "./components/ItemContainer";
import CheckoutContainer from "./components/CheckoutContainer";
import NavBar from "./components/NavBar";

export interface CheckoutItem {
  product: ClothingProduct;
  quantity: number;
}

function App() {
  const [items, setItems] = useState<ClothingProduct[]>(products);
  const [checkout, setCheckout] = useState<CheckoutItem[]>([]);

  function addToCheckout(productId: number, selectedQuantity: number) {
    const product = items.find((item) => item.id === productId);

    if (
      !product ||
      selectedQuantity <= 0 ||
      selectedQuantity > product.quantity
    ) {
      return;
    }

    const existingItem = checkout.find((item) => item.product.id === productId);

    if (existingItem) {
      setCheckout(
        checkout.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item,
        ),
      );
    } else {
      setCheckout([
        ...checkout,
        { product: product, quantity: selectedQuantity },
      ]);
    }

    setItems(
      items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - selectedQuantity }
          : item,
      ),
    );
  }

  function removeFromCheckout(productId: number) {
    const removedItem = checkout.find((item) => item.product.id === productId);
    if (!removedItem) {
      return;
    }

    setItems(
      items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + removedItem.quantity }
          : item,
      ),
    );

    setCheckout(checkout.filter((item) => item.product.id !== productId));
  }

  function emptyCheckout() {
    setItems(
      items.map((item) => {
        const checkoutItem = checkout.find(
          (cartItem) => cartItem.product.id === item.id,
        );

        if (checkoutItem) {
          return {
            ...item,
            quantity: item.quantity + checkoutItem.quantity,
          };
        }
        return item;
      }),
    );

    setCheckout([]);
  }

  return (
    <div>
      <NavBar />
      <h1>Thrift Happens</h1>
      <ItemContainer products={items} addToCheckout={addToCheckout} />

      <CheckoutContainer
        checkout={checkout}
        removeFromCheckout={removeFromCheckout}
        emptyCheckout={emptyCheckout}
      />
    </div>
  );
}
export default App;
