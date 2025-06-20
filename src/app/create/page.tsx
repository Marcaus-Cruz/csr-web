"use client";

import type { CategoryType, RatingType } from "@/app/types/category.types";
import {
  BASE_CATEGORIES,
  BASE_CATEGORIES_IDS,
} from "@/app/types/category.types";
import { ValueOf } from "next/dist/shared/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import pb from "../lib/pocketbaseClient";
import { withAuth } from "../lib/withAuth";
import { CHICKEN_EMOJIS, CONSTANT_HASHTAGS } from "../reviews/[id]/page";
import "./createPage.css";

function CreateNewReview() {
  const [restName, setRestName] = useState("");
  const [sandName, setSandName] = useState("");
  const [intro, setIntro] = useState("");
  const [categories, setCategories] = useState<CategoryType[]>(BASE_CATEGORIES);
  const [newCategory, setNewCategory] = useState<CategoryType>(
    getNewCategoryItem()
  );
  const [remarks, setRemarks] = useState("");
  const [existingHashTags, setExistingHashTags] = useState<string[]>([]); // ...Constant Hashtags

  const router = useRouter();

  async function create(event) {
    event.preventDefault();

    [restName, sandName, intro, remarks].forEach((text) => {
      if (!text) {
        throw new Error(`[CreateReview][onSubmit] - text is empty`);
      }
    });

    existingHashTags.forEach((tag) => {
      if (!tag) {
        throw new Error(`[CreateReview][onSubmit] - tag is empty`);
      }
    });

    // * Set values for each category
    const filteredCategories = categories
      .filter(
        ({ text: categoryName, ratings }) =>
          categoryName.trim() && ratings.length > 0
      )
      .map((category) => {
        const filteredRatings = category.ratings.filter((rating) =>
          rating.text.trim()
        );

        return {
          ...category,
          ratings: filteredRatings,
          value: getAverageValue(filteredRatings),
        };
      });

    // * Separate categories. Omit any that are left empty
    const mainCategories = filteredCategories.filter((category) =>
      BASE_CATEGORIES_IDS.includes(category.id)
    );
    const extraCategories = filteredCategories.filter(
      (category) => !BASE_CATEGORIES_IDS.includes(category.id)
    );

    // * Calculate overall rating
    const overallRating = getAverageValue(mainCategories);
    const altRating = getAverageValue(filteredCategories);

    // * Append hashtags
    const hashtags = [...existingHashTags, ...CONSTANT_HASHTAGS];

    const owner = pb.authStore.record;

    console.log(`[CreateReview][onSubmit]`, {
      owner,
      restName,
      sandName,
      intro,
      categories,
      filteredCategories,
      mainCategories,
      extraCategories,
      remarks,
      hashtags,
      overallRating,
      altRating,
    });

    const response = await fetch(
      "https://csr-web-pb.onrender.com/api/collections/reviews/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pb.authStore.token}`,
        },
        body: JSON.stringify({
          owner: owner?.id,
          restName,
          sandName,
          intro,
          categories: filteredCategories,
          mainCategories,
          extraCategories,
          overallRating,
          altRating,
          remarks,
          hashtags,
        }),
      }
    );

    setRestName("");
    setSandName("");
    setIntro("");
    setCategories(BASE_CATEGORIES);
    setRemarks("");
    setExistingHashTags([]);

    const data = await response.json();

    router.push(`/reviews/${data.id}`);
  }

  return (
    <form onSubmit={create} className={`create-review-form`}>
      <Container className="descriptors">
        <div className={`form-label${!restName ? " empty" : ""}`}>
          Resturaunt ⇒
        </div>
        <input
          type="text"
          name="restName"
          className={`form-input text${!restName ? " empty" : ""}`}
          minLength={1}
          maxLength={50}
          value={restName}
          onChange={(e) => setRestName(e.target.value)}
        />
        <div className={`form-label${!sandName ? " empty" : ""}`}>
          Sandwich ⇒
        </div>
        <input
          type="text"
          name="sandName"
          className={`form-input text${!sandName ? " empty" : ""}`}
          minLength={1}
          maxLength={50}
          value={sandName}
          onChange={(e) => setSandName(e.target.value)}
        />
      </Container>
      <Container className="intro">
        <div className={`form-label${!intro ? " empty" : ""}`}>Intro ⇒</div>
        <textarea
          name="intro"
          className={`form-input text long${!intro ? " empty" : ""}`}
          minLength={1}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </Container>
      <Container className="categories main">
        <div className={"form-label"}>Categories ⇒</div>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            currentCategory={category}
            updateCategories={setCategories}
          />
        ))}
        <button
          type="button"
          className="btn btn-add"
          onClick={() => {
            setNewCategory(getNewCategoryItem());
            setCategories([...categories, newCategory]);
          }}
        >
          New Category
        </button>
      </Container>
      <Container className="remarks">
        <div className={`form-label${!remarks ? " empty" : ""}`}>Remarks ⇒</div>
        <textarea
          name="remarks"
          className={`form-input text long${!remarks ? " empty" : ""}`}
          minLength={1}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </Container>

      <HashtagSection
        existingHashTags={existingHashTags}
        setExistingHashTags={setExistingHashTags}
      />
      <Container className="btn-container">
        <button type="submit" className="btn btn-submit">
          Submit Review
        </button>
      </Container>
    </form>
  );
}

export default withAuth(CreateNewReview);

type CategoryItemProps = {
  currentCategory: CategoryType;
  updateCategories: (updater: (prev: CategoryType[]) => CategoryType[]) => void;
};

export function CategoryItem({
  currentCategory,
  updateCategories,
}: CategoryItemProps) {
  const updateCategoryText = (text: string) => {
    updateCategories((prevCategories) =>
      prevCategories.map((prevCategory) =>
        prevCategory.id === currentCategory.id
          ? { ...prevCategory, text }
          : prevCategory
      )
    );
  };

  const addNewRating = () => {
    const newRating: RatingType = {
      id: uuid(),
      text: "",
      value: 5,
      category: currentCategory.id,
      emoji: "",
    };

    updateCategories((prevCategories) =>
      prevCategories.map((prevCategory) =>
        prevCategory.id === currentCategory.id
          ? { ...prevCategory, ratings: [...prevCategory.ratings, newRating] }
          : prevCategory
      )
    );
  };

  return (
    <div className="container category" key={currentCategory.id}>
      <input
        type="text"
        name={currentCategory.id}
        className={`form-input text${!currentCategory.text ? " empty" : ""}`}
        value={currentCategory.text}
        placeholder="This Category will not be counted."
        onChange={(event) => updateCategoryText(event.target.value)}
      />

      {currentCategory.ratings?.map((rating) => (
        <RatingItem
          key={rating.id}
          rating={rating}
          categoryId={currentCategory.id}
          updateCategories={updateCategories}
        />
      ))}

      {currentCategory.text && (
        <button
          type="button"
          className="btn btn-add-rating"
          onClick={addNewRating}
        >
          Add Rating
        </button>
      )}
    </div>
  );
}

type RatingItemProps = {
  rating: RatingType;
  categoryId: string;
  updateCategories: (updater: (prev: CategoryType[]) => CategoryType[]) => void;
};

export function RatingItem({
  rating,
  categoryId,
  updateCategories,
}: RatingItemProps) {
  const updateRatingField = (
    field: keyof RatingType,
    value: ValueOf<RatingType>
  ) => {
    updateCategories((previousCategories) => {
      const updatedCategories = [...previousCategories];
      const updatingCategory = updatedCategories.find(
        (existingCategory) => existingCategory.id === categoryId
      );
      if (!updatingCategory) return previousCategories;
      const updatedRating = updatingCategory.ratings.find(
        (existingRating) => existingRating.id === rating.id
      );
      if (!updatedRating) return previousCategories;
      updatedRating[field] = value;
      return updatedCategories;
    });
  };

  return (
    <div key={rating.id} className="rating-item">
      <div className="rating-item-child name">
        <input
          type="text"
          name={rating.text}
          className={`form-input text${!rating.text ? " empty" : ""}`}
          value={rating.text}
          placeholder="Rating will not be counted."
          onChange={(e) => updateRatingField("text", e.target.value)}
        />
      </div>
      <div className="rating-item-child value">
        <button
          type="button"
          className="btn btn-increment"
          onClick={() => updateRatingField("value", rating.value - 0.5)}
        >
          -
        </button>
        <input
          id={`rating-${rating.id}`}
          type="number"
          value={rating.value}
          onChange={(e) =>
            updateRatingField("value", parseFloat(e.target.value))
          }
          className={"form-input text"}
          placeholder="0-10"
          min={0}
          max={10}
          step={0.5}
        />
        <button
          type="button"
          className="btn btn-increment"
          onClick={() => updateRatingField("value", rating.value + 0.5)}
        >
          +
        </button>
      </div>
      <input
        name={`${rating.id}-emoji`}
        className="form-input text rating-item-child emoji"
        type="text"
        value={rating.emoji}
        onChange={(e) => updateRatingField("emoji", e.target.value)}
        placeholder={CHICKEN_EMOJIS.full}
      />
    </div>
  );
}

function getNewCategoryItem(): CategoryType {
  return {
    id: uuid(),
    text: "",
    ratings: [],
    value: 0,
  };
}

// TODO: Create into component
export function Container({ children, className = "" }) {
  return <div className={`container ${className}`}>{children}</div>;
}

type HashtagSectionProps = Readonly<{
  existingHashTags: string[];
  setExistingHashTags: (hashtags: string[]) => void;
}>;
function HashtagSection({
  existingHashTags,
  setExistingHashTags,
}: HashtagSectionProps) {
  const [isAddingHashtag, setIsAddingHashtag] = useState(false);
  const [newHashtag, setNewHashtag] = useState("");

  function saveHashtag() {
    if (newHashtag.trim() === "") {
      setIsAddingHashtag(false);
      return;
    }
    setExistingHashTags([...existingHashTags, newHashtag]);
    setIsAddingHashtag(false);
    setNewHashtag("");
  }

  function removeHashtag(hashtag: string) {
    setExistingHashTags(existingHashTags.filter((h) => h !== hashtag));
  }

  return (
    <div className="container hashtags">
      <div className="form-label">Hashtags ⇒</div>
      {!isAddingHashtag ? (
        <button
          type="button"
          className="btn btn-add"
          onClick={() => setIsAddingHashtag(true)}
        >
          +
        </button>
      ) : (
        <div className="hashtag new-hashtag">
          #
          <input
            name={newHashtag}
            type="text"
            value={newHashtag}
            onChange={(e) => setNewHashtag(e.target.value)}
            className="form-input text"
          />
          <button className="btn" onClick={() => saveHashtag()}>
            Done
          </button>
        </div>
      )}
      {existingHashTags.map((hashtag) => {
        return (
          <div key={hashtag} className="hashtag">
            #<input name={hashtag} type="text" value={hashtag} disabled />
            <button
              className="btn btn-remove"
              onClick={() => removeHashtag(hashtag)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <div className="hashtag">
        #
        <input
          name={CONSTANT_HASHTAGS[0]}
          type="text"
          value={CONSTANT_HASHTAGS[0]}
          disabled
        />
      </div>
      <div className="hashtag">
        #
        <input
          name={CONSTANT_HASHTAGS[1]}
          type="text"
          value={CONSTANT_HASHTAGS[1]}
          disabled
        />
      </div>
    </div>
  );
}

function getAverageValue(catsOrRatings: CategoryType[] | RatingType[]) {
  const total = catsOrRatings.reduce(
    (acc, category) => acc + category.value,
    0
  );
  const average = parseFloat((total / catsOrRatings.length).toFixed(1));
  return average;
}
