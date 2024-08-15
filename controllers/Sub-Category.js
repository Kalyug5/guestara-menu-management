import mongoose from "mongoose";
import Category from "../models/Category.js";
import SubCategory from "../models/Sub-Category.js";

export const createSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    const subCategoryData = {
      ...req.body,
      categoryId: categoryId,
      taxApplicablity:
        req.body.taxApplicability !== undefined
          ? req.body.taxApplicability
          : category.taxApplicability,
      tax: req.body.tax !== undefined ? req.body.tax : category.tax,
    };
    const subCategory = new SubCategory(subCategoryData);

    await subCategory.save();
    res
      .status(201)
      .json({ message: "Sub Category created successfully", subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.find();
    if (subCategory.length === 0)
      return res.status(404).json({ message: "Sub Category not found" });
    res.status(200).json({ subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.find({ categoryId: id });
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });
    res.status(200).json({ subCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpecificSubCategory = async (req, res) => {
  try {
    const { identifier } = req.params;
    let subCategory;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      subCategory = await SubCategory.findById(identifier);
    } else {
      subCategory = await SubCategory.findOne({ name: identifier });
    }
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!subCategory)
      return res.status(404).json({ message: "Sub Category not found" });
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
