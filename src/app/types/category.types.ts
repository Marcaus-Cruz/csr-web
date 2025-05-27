export type CategoryRatingType = {
  id: string;
  text: string;
  value: number;
};

export type CategoryType = {
  id: string;
  text: string;
  ratings: CategoryRatingType[];
};

export const BASE_CATEGORIES = Object.freeze({
  chicken: {
    id: "chicken",
    text: "CHICKEN",
    ratings: [
      { id: "chicken-crunch", text: "Crunch", value: 0 },
      { id: "chicken-juiciness", text: "Juiciness", value: 0 },
      { id: "chicken-taste", text: "Seasoning/Taste", value: 0 },
    ],
  },
  sauce: {
    id: "sauce",
    text: "SAUCE",
    ratings: [
      { id: "sauce-spiciness", text: "Spicy Spice", value: 0 },
      { id: "sauce-amount", text: "Amount", value: 0 },
      { id: "sauce-taste", text: "Taste", value: 0 },
    ],
  },
  bun: {
    id: "bun",
    text: "BUN",
    ratings: [
      { id: "bun-texture", text: "Texture", value: 0 },
      { id: "bun-taste", text: "Taste", value: 0 },
    ],
  },
});
