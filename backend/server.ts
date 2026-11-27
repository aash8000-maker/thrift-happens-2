import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ClothesItem from "./models/clothesItem";

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    throw new Error("MONGODB_URI is missing");
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Thrift Happens Backend is running");
});

// GET - Retrieve all products
app.get("/data", async (req, res) => {
    try {
        const items = await ClothesItem.find();

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve clothing items"
        });
    }
});

// POST - Add a product
app.post("/data", async (req, res) => {
    try {
        const {
            name,
            image,
            fit,
            category,
            color,
            description,
            size,
            price,
            quantity
        } = req.body || {};

        // Validate text fields
        if (
            typeof name !== "string" || !name.trim() ||
            typeof image !== "string" || !image.trim() ||
            typeof color !== "string" || !color.trim() ||
            typeof description !== "string" ||
            !description.trim()
        ) {
            return res.status(400).json({
                message: "All text fields are required"
            });
        }

        // Validate product options
        if (
            !["men", "women", "kids"].includes(fit) ||
            !["t-shirt", "shirt", "hoodie", "pants", "shorts"]
                .includes(category) ||
            !["XS", "S", "M", "L", "XL", "XXL"].includes(size)
        ) {
            return res.status(400).json({
                message: "Invalid fit, category or size"
            });
        }

        // Validate price and stock
        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            return res.status(400).json({
                message: "Invalid price or quantity"
            });
        }

        // Generate a new ID
        const lastItem = await ClothesItem
            .findOne()
            .sort({ id: -1 });

        let newId = 0;

        if (lastItem) {
            newId = lastItem.id + 1;
        }

        // Create the product
        const newItem = new ClothesItem({
            id: newId,
            name: name.trim(),
            image: image.trim(),
            fit: fit,
            category: category,
            color: color.trim(),
            description: description.trim(),
            size: size,
            price: price,
            quantity: quantity,
            itemQuantity: 0
        });

        const savedItem = await newItem.save();

        res.status(201).json(savedItem);

  } catch (error) {
    console.log(error);

    res.status(500).json({
        message: "Failed to create clothing item"
    });
}
});

// PATCH - Edit a product
app.patch("/data/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 0) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const {
            name,
            image,
            fit,
            category,
            color,
            description,
            size,
            price,
            quantity
        } = req.body || {};

        // Validate text fields
        if (
            typeof name !== "string" || !name.trim() ||
            typeof image !== "string" || !image.trim() ||
            typeof color !== "string" || !color.trim() ||
            typeof description !== "string" ||
            !description.trim()
        ) {
            return res.status(400).json({
                message: "All text fields are required"
            });
        }

        // Validate product options
        if (
            !["men", "women", "kids"].includes(fit) ||
            !["t-shirt", "shirt", "hoodie", "pants", "shorts"]
                .includes(category) ||
            !["XS", "S", "M", "L", "XL", "XXL"].includes(size)
        ) {
            return res.status(400).json({
                message: "Invalid fit, category or size"
            });
        }

        // Validate price and stock
        if (
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            return res.status(400).json({
                message: "Invalid price or quantity"
            });
        }

        const updatedItem = await ClothesItem.findOneAndUpdate(
            { id: id },
            {
                name: name.trim(),
                image: image.trim(),
                fit: fit,
                category: category,
                color: color.trim(),
                description: description.trim(),
                size: size,
                price: price,
                quantity: quantity
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Clothing item not found"
            });
        }

        res.status(200).json(updatedItem);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update clothing item"
        });
    }
});

// DELETE - Remove a product
app.delete("/data/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id < 0) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const deletedItem = await ClothesItem.findOneAndDelete({
            id: id
        });

        if (!deletedItem) {
            return res.status(404).json({
                message: "Clothing item not found"
            });
        }

        res.status(200).json({
            message: "Clothing item deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete clothing item"
        });
    }
});

// Connect to MongoDB and start the server
mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });