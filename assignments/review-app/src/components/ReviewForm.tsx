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
    <div className="lg:w-1/3 mx-auto p-3 shadow-md rounded-lg space-y-4 mt-4">
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
          placeholder="e.g. Othoba.com"
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
              ? "Describe your experience with this shop."
              : review.rating < 3
              ? "What went wrong? How can this shop improve?"
              : review.rating === 3
              ? "What did you like or dislike? What is this shop doing well, or how can they improve?"
              : "What made your experience great? What is this shop doing well?"
          }
          onChange={onInputChange}
          value={review.content}
        />
        {errors.content && (
          <span className="text-red-500 text-sm">Content is required.</span>
        )}
      </div>

      <div className="flex justify-end items-center gap-3 mt-2">
        {review.id && (
          <button
            type="button"
            onClick={() => setReview({ shopName: "", content: "", rating: 0 })}
            className="bg-gray-300 text-black px-3 py-1.5 rounded-lg active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
        )}
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
