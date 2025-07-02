import ReviewCard from "./ReviewCard";
import "./reviews.css";

async function getReviews() {
  return [];
}

export default async function ReviewsPage() {
  const reviews = (await getReviews()) || [];

  console.log("[reviews][Page]", { reviews });

  return (
    <div className="page reviews-container">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
