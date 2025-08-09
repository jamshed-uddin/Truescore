import { ReviewType } from "@/lib/types";
import React, { useEffect, useRef, useState } from "react";
import RatingStars from "./RatingStars";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useReview } from "@/providers/ReviewProvider";

const ReviewCard = ({ review }: { review: ReviewType }) => {
  const { setReview, setEditingReviewId } = useReview();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = () => {
    setOpenMenu(false);
  };

  //   to close menu while clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const setReviewToEdit = () => {
    setEditingReviewId(review.id as string);
    setReview(review);
  };

  return (
    <div className="border border-gray-300  rounded-lg flex flex-col">
      <div className="p-2 flex justify-between">
        <RatingStars rating={review?.rating} className="!gap-0 " />

        <div className="relative " ref={menuRef}>
          <button
            onClick={() => setOpenMenu((p) => !p)}
            className="cursor-pointer"
          >
            <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
          </button>

          {openMenu && (
            <div className="flex items-center gap-2 absolute right-5 top-0 bg-gray-200 rounded-lg py-1 px-1.5">
              <button onClick={setReviewToEdit} className="cursor-pointer">
                <PencilSquareIcon className="w-4 h-4 text-gray-500" />
              </button>

              <button className="cursor-pointer">
                <TrashIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="p-2 flex-1">{review?.content}</h3>

      <h4 className="border-t  border-gray-200 p-2 text-sm mt-4">
        {review?.shopName}
      </h4>
    </div>
  );
};

export default ReviewCard;
