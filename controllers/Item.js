import mongoose from "mongoose";
import Category from "../models/Category.js";
import Item from "../models/Item-model.js";
import SubCategory from "../models/Sub-Category.js";

export const createItem = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.body;
    if (subCategoryId) {
      const subCategory = await SubCategory.findById(subCategoryId);
      if (!subCategory)
        return res.status(404).json({ message: "Sub Category not found" });
      req.body.taxApplicability =
        req.body.taxApplicability !== undefined
          ? req.body.taxApplicability
          : subCategory.taxApplicability;
      req.body.tax =
        req.body.tax !== undefined ? req.body.tax : subCategory.tax;
    } else if (categoryId) {
      const foundCategory = await Category.findById(categoryId);
      if (!foundCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      req.body.taxApplicability =
        req.body.taxApplicability !== undefined
          ? req.body.taxApplicability
          : foundCategory.taxApplicability;
      req.body.tax =
        req.body.tax !== undefined ? req.body.tax : foundCategory.tax;
    } else {
      return res
        .status(400)
        .json({ error: "Category or Sub-category must be provided" });
    }

    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.find({ categoryId: id });

    if (items.length === 0) {
      const subCategory = await SubCategory.find({ categoryId: id });

      if (subCategory.length === 0) {
        return res
          .status(404)
          .json({ message: "No items found for this category" });
      }

      const itemsData = await Promise.all(
        subCategory.map(async (item) => {
          return await Item.find({ subCategoryId: item._id });
        })
      );

      return res.status(200).json(itemsData);
    }

    return res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemBySubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.find({ subCategoryId: id });
    if (items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this sub-category" });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    let item;

    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await Item.findById(id);
    } else {
      item = await Item.findOne({ name: id });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.baseAmount || req.body.discount) {
      const baseAmount =
        req.body.baseAmount !== undefined ? req.body.baseAmount : undefined;
      const discount = req.body.discount !== undefined ? req.body.discount : 0;
      req.body.totalAmount = baseAmount - discount;
    }

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const searchItem = async (req, res) => {
  try {
    const { name } = req.query;
    console.log(name);

    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide a name to search for" });
    }
    const items = await Item.find({ name: { $regex: name, $options: "i" } });
    if (items.length === 0) {
      return res
        .status(404)
        .json({ error: "No items found with the given name" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
