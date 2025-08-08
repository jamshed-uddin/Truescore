"use client";

import { ReviewType } from "@/lib/types";
import React, { createContext, ReactNode, useState } from "react";

export interface ReviewContextType {
  reviews: ReviewType[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  addReview: (review: ReviewType) => void;
  editReview: (editedReview: ReviewType) => void;
  deleteReview: (reviewId: string) => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  const addReview = (review: ReviewType) => {};
  const editReview = (editedReview: ReviewType) => {};
  const deleteReview = (reviewId: string) => {};
  const value = {
    reviews,
    setReviews,
    addReview,
    editReview,
    deleteReview,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export default ReviewProvider;
