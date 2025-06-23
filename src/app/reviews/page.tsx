import ReviewCard from "./ReviewCard";
import "./reviews.css";

async function getReviews() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/reviews/records?page=1&perPage=30",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return (data?.items || []) as any[];
}

export default async function ReviewsPage() {
  const reviews = await getReviews() || [];

  console.log("[reviews][Page]", { reviews });

  return (
    <div className="page reviews-container">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
