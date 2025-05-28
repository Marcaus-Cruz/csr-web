import Image from "next/image";
import "./page.css";

async function getReviews() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/reviews/records?page=1&perPage=30",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div>
      <h1>Reviews</h1>
      <div>
        {reviews?.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  const { restName, sandName, thumbnail } = review;

  const imageUrl = thumbnail || "/logo-csr.png";

  console.log({ review, imageUrl });

  return (
    <button className="review-card">
      <div className="text-container">
        <div className="text sand-name">{sandName}</div>
        <div className="text rest-name">{restName}</div>
      </div>
      <Image
        className="thumbnail bg"
        src={imageUrl}
        alt={`Thumbnail for the ${sandName} rating from ${restName}`}
        fill={true}
      />
    </button>
  );
}
