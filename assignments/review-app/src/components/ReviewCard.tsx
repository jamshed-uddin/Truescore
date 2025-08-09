import { ReviewType } from "@/lib/types";
import React from "react";
import RatingStars from "./RatingStars";

const ReviewCard = ({ review }: { review: ReviewType }) => {
  return (
    <div className="border border-gray-300  rounded-lg ">
      <div className="p-2">
        <RatingStars rating={review?.rating} className="!gap-0 " />
      </div>

      <h3 className="p-2 ">{review?.content}</h3>

      <h4 className="border-t  border-gray-200 p-2 text-sm mt-4">
        {review?.shopName}
      </h4>
    </div>
  );
};

export default ReviewCard;
