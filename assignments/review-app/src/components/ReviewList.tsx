"use client";
import { useReview } from "@/providers/ReviewProvider";
import React from "react";
import ReviewCard from "./ReviewCard";
import { useSearchParams } from "next/navigation";
import SearchInput from "./SearchInput";

const ReviewList = () => {
  const { reviews, loading } = useReview();
  const params = useSearchParams();

  const filteredReview = reviews.filter((review) => {
    if (params.get("search")) {
      const query = params.get("search")?.toLowerCase();

      return review.shopName.toLowerCase().includes(query as string);
    }

    return true;
  });

  console.log("search params ", params.get("search"));
  console.log("search re", filteredReview);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap mb-5 lg:mb-3">
        <h3 className="text-xl font-medium ">Recent reviews</h3>
        <SearchInput />
      </div>

      <div>
        {loading ? (
          <h3>Loading...</h3>
        ) : reviews.length > 0 ? (
          filteredReview.length === 0 ? (
            <div>
              <h4>
                No review found for{" "}
                <span className="font-medium">{params.get("search")}</span>
              </h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredReview.map((review) => (
                <ReviewCard review={review} key={review.id} />
              ))}
            </div>
          )
        ) : (
          <div>No review yet.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
