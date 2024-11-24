const reviewDbService = require("../services/bookReviewService");

const createReview = async (req, res) => {
  try {
    const { Title, Author, Rating, Comment } = req.body;

    // validation
    if (!Title || !Author || !Rating || !Comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const review = await reviewDbService.createReview({
      Title,
      Author,
      Rating,
      Comment,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred when create review.",
      error: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewDbService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred when fetching reviews.",
      error: error.message,
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await reviewDbService.getReviewById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred when fetching review.",
      error: error.message,
    });
  }
};

const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Author, Rating, Comment } = req.body;

    const review = await reviewDbService.updateReviewById(id, {
      Title,
      Author,
      Rating,
      Comment,
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred when updating review.",
      error: error.message,
    });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await reviewDbService.deleteReviewById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred when deleting review.",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
