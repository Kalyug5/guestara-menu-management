import express from "express";
import {
  createCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../controllers/Category.js";

const category = express.Router();

category.get("/", getAllCategory);
category.get("/:identifier", getOneCategory);
category.post("/", createCategory);
category.put("/:id", updateCategory);

export default category;
