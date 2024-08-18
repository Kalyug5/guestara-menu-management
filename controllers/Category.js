import mongoose from "mongoose";
import Category from "../models/Category.js";
import SubCategory from "../models/Sub-Category.js";
import Item from "../models/Item-model.js";

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length === 0)
      res.status(404).json({ message: "No categories found" });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getOneCategory = async (req, res) => {
  try {
    const { identifier } = req.params;
    console.log(identifier);

    let category;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      category = await Category.findById(identifier);
    } else {
      category = await Category.findOne({ name: identifier });
    }
    if (!category) {
      return res.status(400).json({
        error: "Category not found",
        status: 400,
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(400).json({ error: "Category not found", status: 400 });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
      return res.status(400).json({ error: "Category not found", status: 400 });

    const subCategory = await SubCategory.find({ categoryId: id });

    await Item.deleteMany({ categoryId: id });

    for (const subcategory of subCategory) {
      await Item.deleteMany({ subCategoryId: subcategory._id });
    }

    await SubCategory.deleteMany({ categoryId: id });

    await Category.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Category and all related data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
