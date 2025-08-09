import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";

const RatingStars = ({
  rating,
  onStarClick,
}: {
  rating: number;
  onStarClick?: (ratingNum: number) => void;
}) => {
  return (
    <div className=" flex  gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => onStarClick?.(num)}
          className="cursor-pointer "
        >
          <StarIcon
            className={`w-6 h-6 ${
              num <= rating ? "fill-amber-400 text-amber-400" : "text-gray-400 "
            }`}
          />
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
