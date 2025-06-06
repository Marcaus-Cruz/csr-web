import type {
  RatingType,
  CategoryType,
  DB_REVIEW,
} from "@/app/types/category.types";

async function getReview(id: string) {
  console.log("[reviews][id][page][getReview]", { id });

  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/reviews/records/${id}`,
    { next: { revalidate: 10 } }
  );

  return (await res.json()) as DB_REVIEW;
}

export default async function ReviewPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  console.log("[reviews][id][page]", { params });

  const review = await getReview(params.id);

  console.warn({ review });

  const { restName, sandName, intro, remarks, hashtags } = review;

  return (
    <div className="review">
      <div className="text-container">
        <ReviewIntroText
          restName={restName}
          sandName={sandName}
          intro={intro}
        />
        <ReviewRatingsSection type="main" review={review} />
        <br />
        <ReviewRatingsSection type="extras" review={review} />
        <br />
        <div className="text remarks">{remarks}</div>
        <br />
        {Hashtags(hashtags)}
      </div>
      <button className="btn edit">Edit Review</button>
    </div>
  );
}

const PREFIXES: Partial<Record<keyof DB_REVIEW | "hitlist", string>> =
  Object.freeze({
    sandName: "Sandie: ",
    restName: "Location: ",
    intro: "",
    mainCategories: "My Review:",
    overallRating: "OG RATING: ",
    extraCategories: "EXTRAS:",
    altRating: "ALTERNATE RATING: ",
    hitlist: "Here's my current hit list (in no particular order):",
  });

export const CONSTANT_HASHTAGS = Object.freeze([
  "chickiesandy",
  "searchforthebestchickiesandyinamerica",
]);

export const CHICKEN_EMOJIS = Object.freeze({
  full: "\u{1F414}",
  half: "\u{1F425}",
});

function ReviewIntroText({
  sandName,
  restName,
  intro,
}: Readonly<Pick<DB_REVIEW, "sandName" | "restName" | "intro">>) {
  return (
    <div className="intro-container">
      <div className="text sand-name">{`${PREFIXES.sandName}${sandName}`}</div>
      <div className="text rest-name">{`${PREFIXES.restName}${restName}`}</div>
      <br />
      <div className="text intro">{`${PREFIXES.intro}${intro}`}</div>
      <br />
    </div>
  );
}

function ReviewRatingsSection({
  review,
  type,
}: Readonly<{
  review: DB_REVIEW;
  type: "main" | "extras";
}>) {
  if (
    (type === "main" && !review.mainCategories?.length) ||
    (type === "extras" && !review.extraCategories?.length)
  ) {
    return <div></div>;
  }

  const prefixCategory =
    type === "main" ? PREFIXES.mainCategories : PREFIXES.extraCategories;
  const categories =
    type === "main" ? review.mainCategories : review.extraCategories;
  const sandwichRating =
    type === "main" ? review.overallRating : review.altRating;
  const prefixRating =
    type === "main" ? PREFIXES.overallRating : PREFIXES.altRating;

  return (
    <div className={`categories ${type}`}>
      {prefixCategory}
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
      {prefixRating} {sandwichRating}/10
      <br />
      {getRatingEmojis(sandwichRating)}
      <br />
    </div>
  );
}

function getRatingEmojis(rating: number): string {
  const fullCount = Math.floor(rating);
  const hasHalf = rating - fullCount >= 0.25 && rating - fullCount < 0.85;

  const fullChickens = CHICKEN_EMOJIS.full.repeat(fullCount);
  const halfChicken = hasHalf ? CHICKEN_EMOJIS.half : "";
  const maxChickens = CHICKEN_EMOJIS.full.repeat(10);

  return `${fullChickens}${halfChicken}/${maxChickens}`;
}

function CategoryItem(categoryItemData: Readonly<CategoryType>) {
  console.log("[ReviewPage][CategoryItem]", { categoryItemData });

  return (
    <div className="category">
      <div className="category-rating">
        <div className="category-rating-text">
          {categoryItemData.text}: {categoryItemData.value}
        </div>
      </div>
      <div className="category-ratings">
        {categoryItemData.ratings.map(({ id, text, value }) => (
          <RatingItem key={id} text={text} value={value} />
        ))}
      </div>
      <br />
    </div>
  );
}

function RatingItem(ratingItemData: Readonly<Partial<RatingType>>) {
  console.log("[ReviewPage][RatingItem]", { ratingItemData });

  return (
    <div className="rating">
      <div className="rating-text">
        {individualRatingText(
          ratingItemData.text ?? "",
          ratingItemData.value ?? 0
        )}
      </div>
    </div>
  );
}

function individualRatingText(
  text: string,
  value: number,
  [emoji]: string = ""
): string {
  const postfix = emoji ? ` -> ${emoji}` : "";

  return `/- ${text}: ${value}/10${postfix}`;
}

function Hashtags(hashtags: string[] = []): string {
  if (!hashtags?.length) return ``;
  return `#${[...hashtags].join(" #")}`;
}
