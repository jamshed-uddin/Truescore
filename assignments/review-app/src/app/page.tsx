import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-6 mt-5 mb-10">
      <ReviewForm />

      <Suspense>
        <ReviewList />
      </Suspense>
    </div>
  );
}
