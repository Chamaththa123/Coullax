const express = require("express");
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
} = require("../controllers/bookReviewController");

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReviewById);
router.delete("/:id", deleteReviewById);

module.exports = router;
