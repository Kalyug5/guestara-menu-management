import express from "express";
import {
  createItem,
  getAllItems,
  getItemByCategory,
  getItemById,
  getItemBySubCategory,
  searchItem,
  updateItemById,
} from "../controllers/Item.js";

const Item = express.Router();

Item.get("/search", searchItem);

Item.get("/", getAllItems);
Item.get("/:id", getItemById);
Item.get("/category/:id", getItemByCategory);
Item.get("/subCategory/:id", getItemBySubCategory);
Item.post("/", createItem);
Item.put("/:id", updateItemById);

export default Item;
