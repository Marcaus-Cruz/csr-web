"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReviewCard({ review }: { review: any }) {
  console.log("[ReviewCard]", { review });

  const { id, restName, sandName, thumbnail } = review;
  const imageUrl = thumbnail || "/logo-csr.png";

  const router = useRouter();
  const handleClick = (id: string) => () => {
    router.push(`/reviews/${id}`);
  };

  return (
    <button className="review-card" onClick={handleClick(id)}>
      <div className="text-container">
        <div className="text sand-name">{sandName}</div>
        <div className="text rest-name">{restName}</div>
      </div>
      <Image
        className="thumbnail bg"
        src={imageUrl}
        alt={`Thumbnail for the ${sandName} rating from ${restName}`}
        fill
      />
    </button>
  );
}
