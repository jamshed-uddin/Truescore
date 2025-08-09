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
  setEditingReviewId: React.Dispatch<React.SetStateAction<string>>;
  addReview: () => void;
  deleteReview: (reviewId: string) => void;
}

export const ReviewContext = createContext<ReviewContextType | null>(null);

const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [review, setReview] = useState({
    shopName: "",
    content: "",
    rating: 0,
  });

  const [editingReviewId, setEditingReviewId] = useState("");
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

  //   edit or update review
  const addReview = () => {
    const newReview = {
      id: uuidv4(),
      date: new Date().toISOString(),
      ...review,
    };

    // if there is review in review state for update
    if (editingReviewId) {
      const reviewsWithEditedReview = reviews.map((rev) =>
        rev.id === editingReviewId ? { ...rev, ...review } : rev
      );

      return setReviews(reviewsWithEditedReview);
    }

    setReviews((p) => [...p, newReview]);
  };

  const deleteReview = (reviewId: string) => {
    const reviewsLeft = reviews.filter((rev) => rev.id !== reviewId);
    setReviews(reviewsLeft);
  };
  const value = {
    review,
    setReview,
    setEditingReviewId,
    reviews,
    setReviews,
    addReview,
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
