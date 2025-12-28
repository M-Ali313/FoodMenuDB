import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);
