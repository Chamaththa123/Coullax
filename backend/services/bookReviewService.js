const Review = require("../models/bookReviewModel");

const createReview = async (data) => {
  return await Review.create(data);
};

const getAllReviews = async () => {
  return await Review.find();
};

const getReviewById = async (id) => {
  return await Review.findById(id);
};

const updateReviewById = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

const deleteReviewById = async (id) => {
  return await Review.findByIdAndDelete(id);
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
