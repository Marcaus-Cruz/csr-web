'use client';

import Image from "next/image";

export default function ReviewCard({ review }: { review: any }) {
  const { restName, sandName, thumbnail } = review;
  const imageUrl = thumbnail || "/logo-csr.png";

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
        fill
      />
    </button>
  );
}
