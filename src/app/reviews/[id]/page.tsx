async function getReview(id: string) {
  console.log("[reviews][id][page][getReview]", { id });
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/reviews/records/${id}`,
    {
      // cache: "no-store",
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function ReviewPage({ params }: any) {
  console.log("[reviews][id][page]", { params });
  const review = await getReview(params.id);

  console.warn({ review });

  return (
    <div className="review">
      <div className="text-container">
        <div className="text rest-name">{`[RESURAUNT]: ${review.restName}`}</div>
        <div className="text sand-name">{`[SANDWICH]: ${review.sandName}`}</div>
        <div className="text intro">{`[INTRO]: ${review.intro}`}</div>
        <div className="categories">
          CATEGORIES:
          {Object.values(review.categories).map(
            ({ id: categoryId, text, value, ratings = {} }) => {
              return (
                <div key={categoryId} className="category">
                  <div className="category-name">{text}</div>
                  <div className="category-value">{value}</div>
                  <div className="category-ratings">
                    {Object.values(ratings).map(({ id, text, value }) => (
                      <RatingItem key={id} params={{ text, value }} />
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="review-ratings">
          <div className="overall-rating">{`[OVERALL RATING]: ${review.overallRating}`}</div>
          <div className="alternate-rating">{`[ALTERNATIVE RATING]: ${review.altRating}`}</div>
        </div>
        <div className="text remarks-text">{`[REMARKS]: ${review.remarks}`}</div>
      </div>
    </div>
  );
}

export function RatingItem(params) {
  console.log("[ReviewPage][RatingItem]", { params });
  const { text, value } = params;

  return (
    <div className="rating">
      <div className="rating-text">{text}</div>
      <div className="rating-value">{value}</div>
    </div>
  );
}
