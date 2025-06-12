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
import { withAuth } from "../lib/withAuth";
import { CHICKEN_EMOJIS, CONSTANT_HASHTAGS } from "../reviews/[id]/page";
import "./createPage.css";
import PocketBase from "pocketbase";
import pb from "../lib/pocketbase";

// const pb = new PocketBase("http://127.0.0.1:8090"); // TODO: Make this an exportable const

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

    const mainCategories = categories.filter((category) =>
      BASE_CATEGORIES_IDS.includes(category.id)
    );
    const extraCategories = categories.filter(
      (category) => !BASE_CATEGORIES_IDS.includes(category.id)
    );

    // * Set values for each category
    categories.forEach((category) => {
      if (category.ratings.length === 0) {
        throw new Error(
          `[CreateReview][onSubmit] - category ${category.id} has no ratings`
        );
      }
      category.value = getAverageValue(category.ratings);
    });

    // * Calculate overall rating
    const overallRating = getAverageValue(mainCategories);
    const altRating = getAverageValue(categories);

    // * Append hashtags
    const hashtags = [...existingHashTags, ...CONSTANT_HASHTAGS];

    const owner = pb.authStore.record;

    console.log(`[CreateReview][onSubmit]`, {
      owner,
      restName,
      sandName,
      intro,
      categories,
      mainCategories,
      extraCategories,
      remarks,
      hashtags,
      overallRating,
      altRating,
    });

    const response = await fetch(
      "http://127.0.0.1:8090/api/collections/reviews/records",
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
          categories,
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
        <label htmlFor="restName" className="form-label">
          Resturaunt ⇒
        </label>
        <input
          type="text"
          name="restName"
          className="form-input text"
          minLength={1}
          maxLength={50}
          value={restName}
          onChange={(e) => setRestName(e.target.value)}
        />
        <label htmlFor="sandName" className="form-label">
          Sandwich ⇒
        </label>
        <input
          type="text"
          name="sandName"
          className="form-input text"
          minLength={1}
          maxLength={50}
          value={sandName}
          onChange={(e) => setSandName(e.target.value)}
        />
      </Container>
      <Container className="intro">
        <label htmlFor="intro" className="form-label">
          Intro ⇒
        </label>
        <textarea
          name="intro"
          className="form-input text long"
          minLength={1}
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </Container>
      <Container className="categories main">
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
          +
        </button>
      </Container>
      <Container className="remarks">
        <label htmlFor="remarks" className="form-label">
          Remarks ⇒
        </label>
        <textarea
          name="remarks"
          className="form-input text long"
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
        className="form-label"
        value={currentCategory.text}
        placeholder="New Category"
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
        <button type="button" onClick={addNewRating}>
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
          className="form-label"
          value={rating.text}
          placeholder="New Rating"
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
        className="rating-item-child emoji"
        type="text"
        value={rating.emoji}
        onChange={(e) => updateRatingField("emoji", e.target.value)}
        placeholder={CHICKEN_EMOJIS.full}
        maxLength={1}
      />
    </div>
  );
}

function getNewRatingItem(): RatingType {
  return {
    id: uuid(),
    text: "",
    value: 5,
    category: "",
    emoji: "",
  };
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

function AddButton({ isOnScreen, startAddFunction, elementToDisplay }) {
  if (!isOnScreen) {
    return (
      <button
        type="button"
        className="btn btn-add"
        onClick={() => startAddFunction()}
      >
        +
      </button>
    );
  }

  return elementToDisplay;
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
      <AddButton
        isOnScreen={isAddingHashtag}
        startAddFunction={() => setIsAddingHashtag(true)}
        elementToDisplay={
          <div className="hashtag new-hashtag">
            #
            <input
              name={newHashtag}
              type="text"
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
            />
            <button className="btn" onClick={() => saveHashtag()}>
              Done
            </button>
          </div>
        }
      />
      {existingHashTags.map((hashtag) => {
        return (
          <div key={hashtag} className="hashtag">
            #<input name={hashtag} type="text" value={hashtag} disabled />
            <button className="btn" onClick={() => removeHashtag(hashtag)}>
              -
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

function deleteCategory(categoryId: string) {}

// Hit + button
function addExtraCategory() {}

function QuestionSlider() {}

function getAverageValue(catsOrRatings: CategoryType[] | RatingType[]) {
  const total = catsOrRatings.reduce(
    (acc, category) => acc + category.value,
    0
  );
  const average = parseFloat((total / catsOrRatings.length).toFixed(1));
  return average;
}
