import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import category from "./routes/CategoryRoute.js";
import subCategory from "./routes/SubCategoryRoute.js";
import Item from "./routes/ItemRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/category", category);
app.use("/api/sub-category", subCategory);
app.use("/api/item", Item);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Menu Management",
  });
});

connectDB()
  .then((res) => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
