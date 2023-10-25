const mongoose = require("mongoose");
// CREATE SCHEMA 1
const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category reuired"],
    },
    slug: {
      type: "string",
      lowercase: true,
    },
  },
  { timestamps: true }
);

// CREATE Model
module.exports = mongoose.model("Section", sectionSchema);
