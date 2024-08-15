import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

itemSchema.pre("save", function (next) {
  this.totalAmount = this.baseAmount - this.discount;
  next();
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
