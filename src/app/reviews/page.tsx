import ReviewCard from "./ReviewCard";
import { getServerSession } from "next-auth";
import { authOptions, type CSRUser } from "../api/auth/[...nextauth]/options";
import { getReviewsByOwner, getAllReviews } from "../lib/dynamoReviews";
import "./reviews.css";

async function getReviews() {
  try {
    console.log("[getReviews] Starting to fetch reviews...");
    const session = await getServerSession(authOptions);
    console.log("[getReviews] Session:", session ? "exists" : "none");
    
    if (!session?.user) {
      // Not logged in - show all reviews
      console.log("[getReviews] No session, fetching all reviews...");
      const allReviews = await getAllReviews();
      console.log("[getReviews] All reviews fetched:", allReviews?.length || 0);
      return allReviews || [];
    }

    // Logged in - show only user's reviews
    const user = session.user as CSRUser;
    console.log("[getReviews] User logged in:", user.id, "fetching user reviews...");
    const userReviews = await getReviewsByOwner(user.id);
    console.log("[getReviews] User reviews fetched:", userReviews?.length || 0);
    return userReviews || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export default async function ReviewsPage() {
  console.log("[ReviewsPage] Starting to load page...");
  const reviews = (await getReviews()) || [];

  console.log("[reviews][Page] Final reviews to render:", { count: reviews.length, reviews });

  if (!reviews || reviews.length === 0) {
    return (
      <div className="page reviews-container">
        <div>No reviews found.</div>
      </div>
    );
  }

  return (
    <div className="page reviews-container">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {reviews.map((review: any) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
