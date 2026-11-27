import { useState } from "react";
import type { FormEvent } from "react";

import type {
    ClothingProduct,
    Fit,
    ClothingCategory,
    ClothingSize
} from "../data/data";

export interface ProductFormData {
    name: string;
    image: string;
    fit: Fit;
    category: ClothingCategory;
    color: string;
    description: string;
    size: ClothingSize;
    price: number;
    quantity: number;
}

interface FormComponentProps {
    editingItem: ClothingProduct | null;
    onSave: (product: ProductFormData) => Promise<boolean>;
    onCancel: () => void;
}

function FormComponent({
    editingItem,
    onSave,
    onCancel
}: FormComponentProps) {

    const [name, setName] = useState(
        editingItem ? editingItem.name : ""
    );

    const [image, setImage] = useState(
        editingItem ? editingItem.image : ""
    );

    const [fit, setFit] = useState<Fit>(
        editingItem ? editingItem.fit : "men"
    );

    const [category, setCategory] = useState<ClothingCategory>(
        editingItem ? editingItem.category : "t-shirt"
    );

    const [color, setColor] = useState(
        editingItem ? editingItem.color : ""
    );

    const [description, setDescription] = useState(
        editingItem ? editingItem.description : ""
    );

    const [size, setSize] = useState<ClothingSize>(
        editingItem ? editingItem.size : "M"
    );

    const [price, setPrice] = useState(
        editingItem ? String(editingItem.price) : ""
    );

    const [quantity, setQuantity] = useState(
        editingItem ? String(editingItem.quantity) : ""
    );

    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // Clear the form
    function clearForm() {
        setName("");
        setImage("");
        setFit("men");
        setCategory("t-shirt");
        setColor("");
        setDescription("");
        setSize("M");
        setPrice("");
        setQuantity("");
    }

    // Submit the form
    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        // Check required fields
        if (
            name.trim() === "" ||
            image.trim() === "" ||
            color.trim() === "" ||
            description.trim() === "" ||
            price.trim() === "" ||
            quantity.trim() === ""
        ) {
            setError("Please complete all fields.");
            return;
        }

        // Convert strings into numbers
        const productPrice = Number(price);
        const productQuantity = Number(quantity);

        // Validate price
        if (
            !Number.isFinite(productPrice) ||
            productPrice < 0
        ) {
            setError("Please enter a valid price.");
            return;
        }

        // Validate quantity
        if (
            !Number.isInteger(productQuantity) ||
            productQuantity < 0
        ) {
            setError("Please enter a valid stock quantity.");
            return;
        }

        // Create the product object
        const product: ProductFormData = {
            name: name.trim(),
            image: image.trim(),
            fit: fit,
            category: category,
            color: color.trim(),
            description: description.trim(),
            size: size,
            price: productPrice,
            quantity: productQuantity
        };

        setSaving(true);

        try {
            const success = await onSave(product);

            if (success && !editingItem) {
                clearForm();
            }
        } catch {
            setError("Failed to save product.");
        }

        setSaving(false);
    }

    return (
        <div>
            <h2>
                {editingItem ? "Edit Product" : "Add Product"}
            </h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Product Name: </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Image Path: </label>

                    <input
                        type="text"
                        value={image}
                        onChange={(event) =>
                            setImage(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Fit: </label>

                    <select
                        value={fit}
                        onChange={(event) =>
                            setFit(event.target.value as Fit)
                        }
                    >
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>

                <div>
                    <label>Category: </label>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value as ClothingCategory
                            )
                        }
                    >
                        <option value="t-shirt">T-Shirt</option>
                        <option value="shirt">Shirt</option>
                        <option value="hoodie">Hoodie</option>
                        <option value="pants">Pants</option>
                        <option value="shorts">Shorts</option>
                    </select>
                </div>

                <div>
                    <label>Color: </label>

                    <input
                        type="text"
                        value={color}
                        onChange={(event) =>
                            setColor(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Description: </label>

                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Size: </label>

                    <select
                        value={size}
                        onChange={(event) =>
                            setSize(
                                event.target.value as ClothingSize
                            )
                        }
                    >
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>

                <div>
                    <label>Price: </label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(event) =>
                            setPrice(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>Stock Quantity: </label>

                    <input
                        type="number"
                        min="0"
                        step="1"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(event.target.value)
                        }
                        required
                    />
                </div>

                <button type="submit" disabled={saving}>
                    {editingItem ? "Update Product" : "Add Product"}
                </button>

                {editingItem && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                )}

            </form>
        </div>
    );
}

export default FormComponent;