import mongoose from "mongoose";

const clothesSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    fit: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    itemQuantity: { type: Number, required: true }
});

export default mongoose.model(
    "ClothesItem",
    clothesSchema,
    "clothes"
);