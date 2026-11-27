import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemContainerProps {
    products: ClothingProduct[];

    addToCheckout: (
        productId: number,
        selectedQuantity: number
    ) => void;

    editProduct: (product: ClothingProduct) => void;

    deleteProduct: (id: number) => void;
}

function ItemContainer({
    products,
    addToCheckout,
    editProduct,
    deleteProduct
}: ItemContainerProps) {
    return (
        <div>
            <h2>Available Clothing</h2>

            {products.map(product => (
                <ItemCard
                    key={product.id}
                    product={product}
                    addToCheckout={addToCheckout}
                    editProduct={editProduct}
                    deleteProduct={deleteProduct}
                />
            ))}
        </div>
    );
}

export default ItemContainer;