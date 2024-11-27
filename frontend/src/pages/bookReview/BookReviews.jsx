import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { EditNewIcon, DeleteRedIcon } from "../../utils/icons";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import axiosClient from "../../../axios-client";
import { AddBookReview } from "./AddBookReview";
import { StarRating } from "../../components/StarRating";
import { UpdateBookReview } from "./UpdateBookReview";
import { customSelectStyles, tableHeaderStyles } from "../../utils/utils";
import Select from "react-select";

export const BookReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addReviewOpen, setAddReviewOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [filterRating, setFilterRating] = useState(null);
  const [sortByDate, setSortByDate] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/reviews");
      setReviews(response.data);
    } catch (error) {
      toast.error("Failed to fetch reviews");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.Rating, 0);
    return reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;
  };

  const averageRating = calculateAverageRating(reviews);

  const filteredReviews = reviews.filter(
    (review) => !filterRating || review.Rating === filterRating
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortByDate === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortByDate === "desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const handleAddClick = () => {
    setAddReviewOpen(true);
  };

  const handleReviewClose = () => {
    setAddReviewOpen(false);
    fetchReviews();
  };

  const handleDeleteClick = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the review.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axiosClient.delete(`/reviews/${reviewId}`);
          toast.success("Review deleted successfully!");
          fetchReviews();
        } catch (error) {
          toast.error("Failed to delete the review.");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const TABLE_USER = [
    {
      name: "Book Title",
      selector: (row) => row.Title,
    },
    {
      name: "Author",
      selector: (row) => row.Author,
    },
    {
      name: "Rating",
      selector: (row) => <StarRating rating={row.Rating} />,
    },
    {
      name: "Comment",
      selector: (row) => row.Comment,
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Tooltip content="View Review">
            <IconButton
              onClick={() => setSelectedReviewId(row._id)}
              variant="text"
              className="mx-2 bg-white"
            >
              <EditNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Review">
            <IconButton
              onClick={() => handleDeleteClick(row._id)}
              variant="text"
              className="mx-2 bg-white"
            >
              <DeleteRedIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const ratingOptions = [
    { value: null, label: "All Ratings" },
    { value: 1, label: "1 Star" },
    { value: 2, label: "2 Stars" },
    { value: 3, label: "3 Stars" },
    { value: 4, label: "4 Stars" },
    { value: 5, label: "5 Stars" },
  ];

  const sortOptions = [
    { value: null, label: "Sort by Date" },
    { value: "asc", label: "Oldest to Newest" },
    { value: "desc", label: "Newest to Oldest" },
  ];

  return (
    <div className="py-5">
      <div className="flex justify-end">
        <button
          onClick={() => handleAddClick()}
          className="p-3 bg-[#002c65] text-white font-medium hover:bg-[#ffffff] hover:text-[#002c65] border-[2px] border-transparent hover:border-[#ffe000] rounded-lg"
        >
          Add Book Review
        </button>
      </div>

      <div className="md:flex md:justify-between max-w-[100%] p-6 bg-white border border-gray-200 rounded-lg shadow mt-4">
        <div className="md:w-[50%] w-full">
          <h3 className="font-bold text-lg text-[#002c65]">{`Average Rating: ${averageRating}/5`}</h3>
          <div className="flex items-center space-x-2">
            <StarRating
              rating={Math.round(averageRating)}
              style={{ cursor: "default" }}
            />
          </div>
        </div>
        <div className="md:w-[50%] w-full">
          <div className="md:flex md:justify-between items-center mb-4 md:gap-2">
            <div className="md:w-[250px]  w-full md:my-0 my-3">
              <Select
                options={ratingOptions}
                value={ratingOptions.find(
                  (option) => option.value === filterRating
                )}
                onChange={(selectedOption) =>
                  setFilterRating(selectedOption.value)
                }
                placeholder="Filter by Rating"
                className="basic-single"
                classNamePrefix="select"
                style={customSelectStyles}
              />
            </div>

            <div className="md:w-[250px]  w-full">
              <Select
                options={sortOptions}
                value={sortOptions.find(
                  (option) => option.value === sortByDate
                )}
                onChange={(selectedOption) =>
                  setSortByDate(selectedOption.value)
                }
                placeholder="Sort by Date"
                className="basic-single"
                classNamePrefix="select"
                style={customSelectStyles}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[20px] mt-10 relative overflow-auto">
        <DataTable
          columns={TABLE_USER}
          responsive
          data={sortedReviews}
          customStyles={tableHeaderStyles}
          className="mt-4"
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          noDataComponent={<div className="text-center">No data available</div>}
          progressPending={loading}
        />
      </div>

      {addReviewOpen && (
        <AddBookReview isOpen={addReviewOpen} onClose={handleReviewClose} />
      )}

      {selectedReviewId && (
        <UpdateBookReview
          isOpen={!!selectedReviewId}
          onClose={() => {
            setSelectedReviewId(null);
            fetchReviews();
          }}
          reviewId={selectedReviewId}
        />
      )}

      <ToastContainer />
    </div>
  );
};
