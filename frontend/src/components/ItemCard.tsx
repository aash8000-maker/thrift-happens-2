import { useState } from "react";
import type { ClothingProduct } from "../data/data";

interface ItemCardProps {
    product: ClothingProduct;

    addToCheckout: (
        productId: number,
        selectedQuantity: number
    ) => void;

    editProduct: (product: ClothingProduct) => void;

    deleteProduct: (id: number) => void;
}

function ItemCard({
    product,
    addToCheckout,
    editProduct,
    deleteProduct
}: ItemCardProps) {

    const [selectedQuantity, setSelectedQuantity] = useState(0);

    const currentQuantity = Math.min(
        selectedQuantity,
        product.quantity
    );

    function increaseQuantity() {
        if (currentQuantity < product.quantity) {
            setSelectedQuantity(currentQuantity + 1);
        }
    }

    function decreaseQuantity() {
        if (currentQuantity > 0) {
            setSelectedQuantity(currentQuantity - 1);
        }
    }

    function handleAdd() {
        if (
            currentQuantity > 0 &&
            currentQuantity <= product.quantity
        ) {
            addToCheckout(
                product.id,
                currentQuantity
            );

            setSelectedQuantity(0);
        }
    }

    const imagePath = product.image.replace(
        "src/assets/images/",
        "/images/"
    );

    return (
        <div>
            <img
                src={imagePath}
                alt={product.name}
                width="150"
            />

            <h3>{product.name}</h3>

            <p>Fit: {product.fit}</p>

            <p>Category: {product.category}</p>

            <p>Color: {product.color}</p>

            <p>Description: {product.description}</p>

            <p>Size: {product.size}</p>

            <p>Price: ${product.price.toFixed(2)}</p>

            <p>Available Stock: {product.quantity}</p>

            {product.quantity === 0 && (
                <p>Out of Stock</p>
            )}

            <button
                onClick={decreaseQuantity}
                disabled={currentQuantity === 0}
            >
                -
            </button>

            <span> {currentQuantity} </span>

            <button
                onClick={increaseQuantity}
                disabled={
                    currentQuantity >= product.quantity
                }
            >
                +
            </button>

            <button
                onClick={handleAdd}
                disabled={
                    currentQuantity === 0 ||
                    product.quantity === 0
                }
            >
                Add to Checkout
            </button>

            <button onClick={() => editProduct(product)}>
                Edit
            </button>

            <button onClick={() => deleteProduct(product.id)}>
                Delete
            </button>
        </div>
    );
}

export default ItemCard;