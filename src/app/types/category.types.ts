export type RatingType = {
  id: string;
  text: string;
  value: number;
  category?: string;
  emoji?: string;
};

export type CategoryType = RatingType & {
  ratings: RatingType[];
};

export type DB_REVIEW = {
  id: string;
  owner: string;
  restName: string;
  sandName: string;
  intro: string;
  categories: CategoryType[];
  mainCategories: CategoryType[];
  extraCategories: CategoryType[];
  overallRating: number;
  altRating: number;
  remarks: string;
  thumbnail: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  hashtags?: string[];
};

export const BASE_CATEGORIES_IDS = Object.freeze(["chicken", "sauce", "bun"]);
export const BASE_CATEGORIES_RATINGS_IDS = Object.freeze([
  "chicken-crunch",
  "chicken-juiciness",
  "chicken-taste",
  "sauce-spiciness",
  "sauce-amount",
  "sauce-taste",
  "bun-texture",
  "bun-taste",
]);

export const BASE_CATEGORIES = Object.freeze([
  {
    id: "chicken",
    text: "CHICKEN",
    ratings: [
      {
        category: "chicken",
        id: "chicken-crunch",
        text: "Crunch",
        value: 5,
        emoji: "",
      },
      {
        category: "chicken",
        id: "chicken-juiciness",
        text: "Juiciness",
        value: 5,
        emoji: "",
      },
      {
        category: "chicken",
        id: "chicken-taste",
        text: "Seasoning/Taste",
        value: 5,
        emoji: "",
      },
    ],
  },
  {
    id: "sauce",
    text: "SAUCE",
    ratings: [
      {
        category: "sauce",
        id: "sauce-spiciness",
        text: "Spice",
        value: 5,
        emoji: "",
      },
      {
        category: "sauce",
        id: "sauce-amount",
        text: "Amount",
        value: 5,
        emoji: "",
      },
      {
        category: "sauce",
        id: "sauce-taste",
        text: "Taste",
        value: 5,
        emoji: "",
      },
    ],
  },
  {
    id: "bun",
    text: "BUN",
    ratings: [
      {
        category: "bun",
        id: "bun-texture",
        text: "Texture",
        value: 5,
        emoji: "",
      },
      { category: "bun", id: "bun-taste", text: "Taste", value: 5, emoji: "" },
    ],
  },
]) as CategoryType[];
