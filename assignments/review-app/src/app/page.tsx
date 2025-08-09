import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";

export default function Home() {
  return (
    <div className="space-y-6 mt-5 mb-10">
      <ReviewForm />
      <ReviewList />
    </div>
  );
}
