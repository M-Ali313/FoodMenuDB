import Category from "../models/Category.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
    image: req.file ? `/uploads/categories/${req.file.filename}` : null,
  });
  res.status(201).json(category);
});

// Read all
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Read single
export const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});

// Update
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  category.name = req.body.name || category.name;
  if (req.file) category.image = `/uploads/categories/${req.file.filename}`;

  await category.save();
  res.json(category);
});

// Delete
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });

  await category.remove();
  res.json({ message: "Category deleted successfully" });
});
