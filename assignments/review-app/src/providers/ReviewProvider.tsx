"use client";

import { ReviewType } from "@/lib/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

export interface ReviewContextType {
  review: ReviewType;
  setReview: React.Dispatch<React.SetStateAction<ReviewType>>;
  reviews: ReviewType[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
  addReview: () => void;
  editReview: () => void;
  deleteReview: (reviewId: string) => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [review, setReview] = useState({
    shopName: "",
    content: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const localReviews: ReviewType[] = localStorage.getItem("reviews")
      ? (JSON.parse(localStorage.getItem("reviews") as string) as ReviewType[])
      : [];

    setReviews(localReviews);
  }, []);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = () => {
    setReviews((p) => [
      ...p,
      { id: uuidv4(), date: new Date().toISOString(), ...review },
    ]);
  };
  const editReview = () => {};
  const deleteReview = (reviewId: string) => {};
  const value = {
    review,
    setReview,
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

export const useReview = () => {
  const value = useContext(ReviewContext);
  if (!value) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return value;
};

export default ReviewProvider;
