import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
   product: ClothingProduct;
  addToCheckout: (productId: number, quantity: number) => void;
}

function ItemCard({ product, addToCheckout }: ItemCardProps) {
const [selectedQuantity, setSelectedQuantity] = useState(0);

function increaseQuantity() {
if (selectedQuantity < product.quantity) {
 setSelectedQuantity(selectedQuantity + 1);
 }}
  function decreaseQuantity() {
    if (selectedQuantity > 0) {
    setSelectedQuantity(selectedQuantity - 1);
 }}

function handleAddToCheckout() {
if (selectedQuantity > 0 && selectedQuantity <= product.quantity) {
    addToCheckout(product.id, selectedQuantity);
    setSelectedQuantity(0);
    }}

  return (
    <div><h2>{product.name}</h2>
<img src={"/images/product-" + (product.id + 1) + ".png"}
  alt={product.name}
  width="150"
/>
    <p>Fit: {product.fit}</p>
    <p>Category: {product.category}</p>
    <p>Colour: {product.color}</p>
    <p>Description: {product.description}</p>
    <p>Size: {product.size}</p>
    <p>Price: ${product.price.toFixed(2)}</p>
    <p>Available Stock: {product.quantity}</p>
    {product.quantity === 0 && <p>Out of Stock</p>}

      <button onClick={decreaseQuantity} disabled={selectedQuantity === 0}>
        -
      </button>
      <span> {selectedQuantity} </span>
      <button
    onClick={increaseQuantity}
    disabled={selectedQuantity >= product.quantity}>
        +
</button>
<button
onClick={handleAddToCheckout}
 disabled={selectedQuantity === 0 || selectedQuantity > product.quantity}>
Add to Checkout
      </button></div>
  );}
export default ItemCard;