"use client";
import { useReview } from "@/providers/ReviewProvider";
import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = () => {
  const { reviews } = useReview();
  return (
    <div>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {reviews.map((review) => (
            <ReviewCard review={review} />
          ))}
        </div>
      ) : (
        <div>No review yet.</div>
      )}
    </div>
  );
};

export default ReviewList;
