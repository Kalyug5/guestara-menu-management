import express from "express";
import {
  createCategory,
  deleteOneCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/Category.js";

const category = express.Router();

category.get("/", getAllCategory);
category.get("/:identifier", getOneCategory);
category.post("/", createCategory);
category.put("/:id", updateCategory);
category.delete("/:id", deleteOneCategory);

export default category;
