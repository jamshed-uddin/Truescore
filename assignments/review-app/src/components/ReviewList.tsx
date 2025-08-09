"use client";
import { useReview } from "@/providers/ReviewProvider";
import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = () => {
  const { reviews, loading } = useReview();

  return (
    <div>
      <h3 className="text-xl font-medium mb-2">Recent reviews</h3>

      <div>
        {loading ? (
          <h3>Loading...</h3>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        ) : (
          <div>No review yet.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
