"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ReviewType } from "@/lib/types";

interface ReviewFormPropType {
  initialReview?: ReviewType;
}

const ReviewForm = ({ initialReview }: ReviewFormPropType) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewType>();

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("shopName")}
        className={`border border-gray-300 rounded-md p-2 block w-full resize-none ${
          errors.shopName
            ? "border-red-500 focus:outline-red-500"
            : "border-black focus:outline-indigo-500"
        }`}
        placeholder="Your argument"
        defaultValue={initialReview?.shopName}
      />
      {errors.shopName && (
        <span className="text-red-500 text-sm">{errors.shopName.message}</span>
      )}
      <textarea
        {...register("review")}
        rows={3}
        className={`border border-gray-300 rounded-md p-2 block w-full resize-none ${
          errors.review
            ? "border-red-500 focus:outline-red-500"
            : "border-black focus:outline-indigo-500"
        }`}
        placeholder="Your argument"
        defaultValue={initialReview?.review}
      />
      {errors.review && (
        <span className="text-red-500 text-sm">{errors.review.message}</span>
      )}

      <div className="flex justify-end gap-3 mt-2">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
