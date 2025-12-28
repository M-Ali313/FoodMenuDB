import Food from "../models/Food.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create Food
export const createFood = asyncHandler(async (req, res) => {
  const { name, price, category } = req.body;
  const food = await Food.create({
    name,
    price,
    category,
    image: req.file ? `/uploads/foods/${req.file.filename}` : null,
  });
  res.status(201).json(food);
});

// Read All Foods
export const getFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find().populate("category");
  res.json(foods);
});

// Read Single Food
export const getFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id).populate("category");
  if (!food) return res.status(404).json({ message: "Food not found" });
  res.json(food);
});

// Update Food
export const updateFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).json({ message: "Food not found" });

  food.name = req.body.name || food.name;
  food.price = req.body.price || food.price;
  food.category = req.body.category || food.category;
  if (req.file) food.image = `/uploads/foods/${req.file.filename}`;

  await food.save();
  res.json(food);
});

// Delete Food
export const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) return res.status(404).json({ message: "Food not found" });

  await food.remove();
  res.json({ message: "Food deleted successfully" });
});
