import { useState, useEffect } from "react";
import axios from "axios";

import type { ClothingProduct } from "../data/data";
import type { ProductFormData } from "./FormComponent";

import ItemContainer from "./ItemContainer";
import CheckoutContainer from "./CheckoutContainer";
import NavBar from "./NavBar";
import FormComponent from "./FormComponent";

export interface CheckoutItem {
  product: ClothingProduct;
  quantity: number;
}

function ThriftHappensApp() {
  const [items, setItems] = useState<ClothingProduct[]>([]);

  const [checkout, setCheckout] = useState<CheckoutItem[]>([]);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingItem, setEditingItem] = useState<ClothingProduct | null>(null);

  // Retrieve products from the database
  async function fetchItems() {
    try {
      const response = await axios.get("http://localhost:3000/data");

      setItems(response.data);
      setError("");
    } catch {
      setError("Failed to load clothing items.");
    }

    setLoading(false);
  }

  // Load products when the application starts
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get("http://localhost:3000/data");

        setItems(response.data);
        setError("");
      } catch {
        setError("Failed to load clothing items.");
      }

      setLoading(false);
    }

    loadProducts();
  }, []);

  // Add or update a product
  async function saveProduct(product: ProductFormData) {
    setError("");
    setMessage("");

    try {
      if (editingItem) {
        await axios.patch(
          `http://localhost:3000/data/${editingItem.id}`,
          product,
        );

        setCheckout((previous) =>
          previous.filter((item) => item.product.id !== editingItem.id),
        );

        setMessage("Product updated successfully.");
      } else {
        await axios.post("http://localhost:3000/data", product);

        setMessage("Product added successfully.");
      }

      setEditingItem(null);

      await fetchItems();

      return true;
    } catch {
      setError("Failed to save product.");
      return false;
    }
  }

  // Delete a product
  async function deleteProduct(id: number) {
    setError("");
    setMessage("");

    try {
      await axios.delete(`http://localhost:3000/data/${id}`);

      setCheckout((previous) =>
        previous.filter((item) => item.product.id !== id),
      );

      if (editingItem !== null) {
        if (editingItem.id === id) {
          setEditingItem(null);
        }
      }

      setMessage("Product deleted successfully.");

      await fetchItems();
    } catch {
      setError("Failed to delete product.");
    }
  }

  // Select a product for editing
  function editProduct(product: ClothingProduct) {
    const originalProduct = items.find((item) => item.id === product.id);

    if (originalProduct) {
      setEditingItem(originalProduct);
      setMessage("");
      setError("");
    }
  }

  // Cancel editing
  function cancelEdit() {
    setEditingItem(null);
  }

  // Calculate available stock
  const availableItems = items.map((product) => {
    const cartItem = checkout.find((item) => item.product.id === product.id);

    let availableQuantity = product.quantity;

    if (cartItem) {
      availableQuantity = product.quantity - cartItem.quantity;
    }

    if (availableQuantity < 0) {
      availableQuantity = 0;
    }

    return {
      ...product,
      quantity: availableQuantity,
    };
  });

  // Add a product to checkout
  function addToCheckout(productId: number, selectedQuantity: number) {
    const product = availableItems.find((item) => item.id === productId);

    if (!product) {
      return;
    }

    if (
      !Number.isInteger(selectedQuantity) ||
      selectedQuantity <= 0 ||
      selectedQuantity > product.quantity
    ) {
      return;
    }

    const existingItem = checkout.find((item) => item.product.id === productId);

    if (existingItem) {
      setCheckout(
        checkout.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity: item.quantity + selectedQuantity,
            };
          }

          return item;
        }),
      );
    } else {
      setCheckout([
        ...checkout,
        {
          product: product,
          quantity: selectedQuantity,
        },
      ]);
    }
  }

  // Remove a product from checkout
  function removeFromCheckout(productId: number) {
    setCheckout(checkout.filter((item) => item.product.id !== productId));
  }

  // Empty checkout
  function emptyCheckout() {
    setCheckout([]);
  }

  return (
    <div>
      <NavBar />

      {loading && <p>Loading clothing items...</p>}

      {error && <p>{error}</p>}

      {message && <p>{message}</p>}

      <FormComponent
        key={editingItem ? editingItem.id : "add"}
        editingItem={editingItem}
        onSave={saveProduct}
        onCancel={cancelEdit}
      />

      {!loading && !error && items.length === 0 && (
        <p>No clothing items available.</p>
      )}

      <ItemContainer
        products={availableItems}
        addToCheckout={addToCheckout}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />

      <CheckoutContainer
        checkout={checkout}
        removeFromCheckout={removeFromCheckout}
        emptyCheckout={emptyCheckout}
      />
    </div>
  );
}

export default ThriftHappensApp;
