export type RatingType = {
  category: string;
  id: string;
  text: string;
  value: number;
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

export const BASE_CATEGORIES = Object.freeze([
  {
    id: "chicken",
    text: "CHICKEN",
    ratings: [
      { category: "chicken", id: "chicken-crunch", text: "Crunch", value: 0 },
      {
        category: "chicken",
        id: "chicken-juiciness",
        text: "Juiciness",
        value: 0,
      },
      {
        category: "chicken",
        id: "chicken-taste",
        text: "Seasoning/Taste",
        value: 0,
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
        value: 0,
      },
      { category: "sauce", id: "sauce-amount", text: "Amount", value: 0 },
      { category: "sauce", id: "sauce-taste", text: "Taste", value: 0 },
    ],
  },
  {
    id: "bun",
    text: "BUN",
    ratings: [
      { category: "bun", id: "bun-texture", text: "Texture", value: 0 },
      { category: "bun", id: "bun-taste", text: "Taste", value: 0 },
    ],
  },
]) as CategoryType[];
