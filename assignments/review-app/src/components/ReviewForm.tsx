"use client";
import React, { useState } from "react";

import { useReview } from "@/providers/ReviewProvider";
import { StarIcon } from "@heroicons/react/24/outline";
import RatingStars from "./RatingStars";

const ReviewForm = () => {
  const { review, addReview, setReview } = useReview();
  const [errors, setErrors] = useState({
    shopName: false,
    content: false,
    rating: false,
  });

  const onInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setErrors((p) => ({ ...p, [name]: false }));
    setReview((p) => ({ ...p, [name]: value }));
  };

  console.log(review);

  const onSubmit = () => {
    if (review.rating === 0) {
      return setErrors((p) => ({ ...p, rating: true }));
    }
    if (!review.shopName.trim()) {
      return setErrors((p) => ({ ...p, shopName: true }));
    }
    if (!review.content.trim()) {
      return setErrors((p) => ({ ...p, content: true }));
    }

    addReview();

    setReview({ shopName: "", content: "", rating: 0 });
  };

  const setRating = (ratingNum: number) => {
    setErrors((p) => ({ ...p, rating: false }));
    setReview((p) => ({ ...p, rating: ratingNum }));
  };

  return (
    <div className=" w-1/3 mx-auto p-3 shadow-md rounded-lg space-y-4 mt-4">
      {/* rating stars */}
      <div>
        <div className="flex justify-center">
          <RatingStars rating={review.rating} onStarClick={setRating} />
        </div>
        {errors.rating && (
          <span className="text-red-500 text-sm">Rating is required.</span>
        )}
      </div>

      {/* shop name */}
      <div>
        <label htmlFor="shopName" className="text-sm ml-1">
          Shop name
        </label>
        <input
          name="shopName"
          className={`border border-gray-300 rounded-md p-2 block w-full resize-none placeholder:text-sm ${
            errors.shopName
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          placeholder="e.g. Booking.com"
          onChange={onInputChange}
          value={review.shopName}
        />
        {errors.shopName && (
          <span className="text-red-500 text-sm">Shop name is required.</span>
        )}
      </div>
      {/* review content */}
      <div>
        <label htmlFor="content" className="text-sm ml-1">
          Review
        </label>
        <textarea
          name="content"
          rows={3}
          className={`border border-gray-300 rounded-md p-2 block w-full resize-none placeholder:text-sm ${
            errors.content
              ? "border-red-500 focus:outline-red-500"
              : "border-black focus:outline-indigo-500"
          }`}
          placeholder={
            review.rating === 0
              ? "Describe your experience with this company."
              : review.rating < 3
              ? "What went wrong? How can this company improve?"
              : review.rating === 3
              ? "What did you like or dislike? What is this company doing well, or how can they improve?"
              : "What made your experience great? What is this company doing well?"
          }
          onChange={onInputChange}
          value={review.content}
        />
        {errors.content && (
          <span className="text-red-500 text-sm">Content is required.</span>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <button
          type="button"
          onClick={onSubmit}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg active:scale-95 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
