const mongoose = require("mongoose");

const bookReviewSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    Rating: { type: Number, required: true },
    Comment: { type: String, required: true },
    Author: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookReview", bookReviewSchema);
