const mongoose = require("mongoose");
// CREATE SCHEMA 1
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category reuired"],
      unique: [true, "Category must be unique"],
      minLength: [3, "tou short category name"],
      maxLength: [33, "tou long category name"],
    },
    slug: {
      type: "string",
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// CREATE Model
module.exports = mongoose.model("Category", categorySchema);
