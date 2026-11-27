import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemContainerProps {
  products: ClothingProduct[];
  addToCheckout: (productId: number, quantity: number) => void;
}

function ItemContainer({ products, addToCheckout }: ItemContainerProps) {
  return (
    <div><h2>Available Clothing</h2>
{products.map((product) => (
<ItemCard
key={product.id}
product={product}
addToCheckout={addToCheckout}/>
))}
 </div>
  );}




  
export default ItemContainer;