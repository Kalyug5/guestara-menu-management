import express from "express";
import {
  createSubCategory,
  getAllSubCategory,
  getSpecificSubCategory,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/Sub-Category.js";

const subCategory = express.Router();

subCategory.get("/", getAllSubCategory);
subCategory.get("/subcategories/:id", getSubCategoryById);
subCategory.get("/:identifier", getSpecificSubCategory);
subCategory.post("/create/:categoryId", createSubCategory);
subCategory.put("/:id", updateSubCategory);

export default subCategory;
