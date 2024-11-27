import React, { useState, useEffect } from "react";
import { CloseIcon } from "../../utils/icons";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import axiosClient from "../../../axios-client";
import { StarRating } from "../../components/StarRating";

export const AddBookReview = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    Title: "",
    Author: "",
    Rating: 0,
    Comment: "",
  });

  const [errors, setErrors] = useState({});

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
      await axiosClient.post("/reviews", formData);
      alert("Book review added successfully!");
      setFormData({ Title: "", Author: "", Rating: 0, Comment: "" });
      onClose();
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review.");
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, Rating: rating });
  };

  return (
    <Dialog
      size="xs"
      open={isOpen}
      handler={onClose}
      className="bg-white shadow-none rounded-[10px] overflow-scroll scrollbar-hide font-inter p-3"
    >
      <DialogHeader className="flex justify-between align-center border-b border-[#ececec] pb-3">
        <div className="flex align-center">
          <div className="mr-3"></div>
          <div>
            <p className="font-poppins text-[18px] font-semibold leading-[28px] text-[#000000]">
              Add New Book Review
            </p>
          </div>
        </div>
        <div onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </div>
      </DialogHeader>
      <DialogBody className="p-5">
        <form onSubmit={handleSubmit}>
          <label className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
            Book Title
          </label>
          <input
            type="text"
            value={formData.Title}
            onChange={(e) =>
              setFormData({ ...formData, Title: e.target.value })
            }
            className="block rounded-[15px] border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C] placeholder:text-[14px] focus:ring-1 focus:ring-inset w-full text-[14px] font-poppins"
            placeholder="Enter book title"
          />
          {errors.Title && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.Title}
            </p>
          )}

          <label className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C] mt-4 block">
            Author
          </label>
          <input
            type="text"
            value={formData.Author}
            onChange={(e) =>
              setFormData({ ...formData, Author: e.target.value })
            }
            className="block rounded-[15px] border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C] placeholder:text-[14px] focus:ring-1 focus:ring-inset w-full text-[14px] font-poppins"
            placeholder="Enter author name"
          />
          {errors.Author && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.Author}
            </p>
          )}

          <label className="font-poppins  text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C] mt-4 block">
            Rating
          </label>
          <div>
            <StarRating
              rating={formData.Rating}
              maxStars={5}
              onClick={handleRatingChange}
              size="2x"
            />
          </div>

          {errors.Rating && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.Rating}
            </p>
          )}

          <label className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C] mt-4 block">
            Comment
          </label>
          <textarea
            value={formData.Comment}
            onChange={(e) =>
              setFormData({ ...formData, Comment: e.target.value })
            }
            className="block rounded-[15px] border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C] placeholder:text-[14px] focus:ring-1 focus:ring-inset w-full text-[14px] font-poppins"
            placeholder="Enter your review"
            rows="4"
          ></textarea>
          {errors.Comment && (
            <p className="pt-1 text-xs font-medium text-red-500">
              {errors.Comment}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full font-poppins p-2.5 bg-[#002c65] text-white font-medium rounded-lg border transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </DialogBody>
    </Dialog>
  );
};
