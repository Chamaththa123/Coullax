import React, { useState, useEffect } from "react";
import { CloseIcon } from "../../utils/icons";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { StarRating } from "../../components/StarRating";

import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";

export const UpdateBookReview = ({ isOpen, onClose, reviewId }) => {
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Rating: 0,
    Comment: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchReviewById = async (reviewId) => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/reviews/${reviewId}`);
      setFormData(response.data);
    } catch (error) {
      toast.error("Failed to fetch review details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && reviewId) {
      fetchReviewById(reviewId);
    }
  }, [isOpen, reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, Rating: rating });
    setErrors({ ...errors, Rating: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Title.trim()) newErrors.Title = "Title is required.";
    if (!formData.Author.trim()) newErrors.Author = "Author is required.";
    if (formData.Rating < 1 || formData.Rating > 5)
      newErrors.Rating = "Rating must be between 1 and 5.";
    if (!formData.Comment.trim()) newErrors.Comment = "Comment is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await axiosClient.put(`/reviews/${reviewId}`, formData);
      toast.success("Review updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      size="xs"
      open={isOpen}
      handler={onClose}
      className="bg-white shadow-none rounded-[10px] overflow-scroll scrollbar-hide font-inter p-3"
    >
      <DialogHeader className="flex justify-between items-center border-b border-[#ececec] pb-3">
        <p className="font-poppins text-[18px] font-semibold leading-[28px] text-[#000000]">
          Edit Book Review
        </p>
        <div onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </div>
      </DialogHeader>
      <DialogBody className="p-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                Book Title
              </label>
              <input
                type="text"
                name="Title"
                value={formData.Title}
                onChange={handleInputChange}
                className="block rounded-[15px] border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C] placeholder:text-[14px] focus:ring-1 focus:ring-inset w-full text-[14px] font-poppins"
                placeholder="Enter book title"
              />
              {errors.Title && (
                <p className="text-red-500 text-sm mt-1">{errors.Title}</p>
              )}
            </div>
            <div>
              <label className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C] mt-4 block">
                Author
              </label>
              <input
                type="text"
                name="Author"
                value={formData.Author}
                onChange={handleInputChange}
                className="block rounded-[15px] border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C] placeholder:text-[14px] focus:ring-1 focus:ring-inset w-full text-[14px] font-poppins"
              />
              {errors.Author && (
                <p className="pt-1 text-xs font-medium text-red-500">
                  {errors.Author}
                </p>
              )}
            </div>
            <div>
              <label className="font-poppins  text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C] mt-4 block">
                Rating
              </label>
              <StarRating
                rating={formData.Rating}
                maxStars={5}
                size="2x"
                onClick={handleRatingChange}
              />
              {errors.Rating && (
                <p className="pt-1 text-xs font-medium text-red-500">
                  {errors.Rating}
                </p>
              )}
            </div>
            <div>
              <label className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C] mt-4 block">
                Comment
              </label>
              <textarea
                name="Comment"
                value={formData.Comment}
                onChange={handleInputChange}
                rows="4"
                className="block rounded-[15px] border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C] placeholder:text-[14px] focus:ring-1 focus:ring-inset w-full text-[14px] font-poppins"
              />
              {errors.Comment && (
                <p className="pt-1 text-xs font-medium text-red-500">
                  {errors.Comment}
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-poppins bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-poppins bg-[#002c65] text-white rounded-md font-medium"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </DialogBody>
    </Dialog>
  );
};
