"use client";
import { useReview } from "@/providers/ReviewProvider";
import React from "react";

const ReviewList = () => {
  const { reviews } = useReview();
  return (
    <div>
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <div key={review.id}>{review.shopName}</div>
          ))}
        </div>
      ) : (
        <div>No review yet.</div>
      )}
    </div>
  );
};

export default ReviewList;
