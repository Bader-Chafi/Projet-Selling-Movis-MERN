const mongoose = require("mongoose");
// CREATE SCHEMA 1
const dateSchema = new mongoose.Schema(
  {
    name: {
      type: Number,
      required: [true, "Category reuired"],
    },
  },
  { timestamps: true }
);

// CREATE Model
module.exports = mongoose.model("Date", dateSchema);
