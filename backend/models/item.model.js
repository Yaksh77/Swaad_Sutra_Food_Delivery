import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Desserts",
        "Beverages",
        "Snacks",
        "Fast Food",
        "Healthy",
        "South Indian",
        "North Indian",
        "Chinese",
        "Italian",
        "Mexican",
        "Bakery",
        "Seafood",
        "Breakfast",
        "Biryani",
        "Street Food",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg", "vegan"],
      required: true,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", itemSchema);
