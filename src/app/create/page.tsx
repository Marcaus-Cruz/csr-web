"use client";

import type { CategoryType, RatingType } from "@/app/types/category.types";
import {
  BASE_CATEGORIES,
  BASE_CATEGORIES_IDS,
} from "@/app/types/category.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CHICKEN_EMOJIS, CONSTANT_HASHTAGS } from "../reviews/[id]/page";
import "./createPage.css";

export default function CreateNewReview() {
  // TODO: if not signed in, redirect to login page

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

  async function create(e) {
    console.log(`[CreateReview][onSubmit]`, {
      restName,
      sandName,
      intro,
      categories,
      remarks,
      existingHashTags,
    });

    e.preventDefault();

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

    await fetch("http://127.0.0.1:8090/api/collections/reviews/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restName,
        sandName,
        intro,
        categories,
        mainCategories,
        extraCategories,
        remarks,
        existingHashTags,
      }),
    });

    setRestName("");
    setSandName("");
    setIntro("");
    setCategories(BASE_CATEGORIES);
    setRemarks("");
    setExistingHashTags([]);

    router.refresh();
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
        {categories.map((category) => {
          return (
            <Container key={`${category.id}`} className="category">
              <input
                type="text"
                className="form-label typewriter"
                value={category.text}
                placeholder="New Category"
                onChange={(e) => {
                  const newCategories = [...categories];
                  const index = newCategories.findIndex(
                    (c) => c.id === category.id
                  );
                  newCategories[index].text = e.target.value;
                  setCategories(newCategories);
                }}
              />
              {category.ratings?.map((rating) => (
                <div key={rating.id} className={"rating-item"}>
                  <div className="rating-item-child name">
                    <input
                      type="text"
                      className="form-label typewriter"
                      value={rating.text}
                      placeholder="New Rating"
                      onChange={(e) => {
                        const newCategories = [...categories];
                        const catIndex = newCategories.findIndex(
                          (c) => c.id === category.id
                        );
                        const ratingIndex = newCategories[
                          catIndex
                        ].ratings.findIndex((r) => r.id === rating.id);
                        newCategories[catIndex].ratings[ratingIndex].text =
                          e.target.value;
                        setCategories(newCategories);
                      }}
                    />
                  </div>
                  <div className="rating-item-child value">
                    <button
                      type="button"
                      className="btn btn-increment"
                      onClick={() => {
                        const newCategories = [...categories];
                        const catIndex = newCategories.findIndex(
                          (c) => c.id === category.id
                        );
                        const ratingIndex = newCategories[
                          catIndex
                        ].ratings.findIndex((r) => r.id === rating.id);
                        newCategories[catIndex].ratings[ratingIndex].value +=
                          -0.5;
                        setCategories(newCategories);
                      }}
                    >
                      -
                    </button>
                    <input
                      id={`rating-${rating.id}`}
                      type="number"
                      value={rating.value}
                      onChange={(e) => {
                        const newCategories = [...categories];
                        const catIndex = newCategories.findIndex(
                          (c) => c.id === category.id
                        );
                        const ratingIndex = newCategories[
                          catIndex
                        ].ratings.findIndex((r) => r.id === rating.id);
                        newCategories[catIndex].ratings[ratingIndex].value =
                          parseFloat(e.target.value);
                        setCategories(newCategories);
                      }}
                      placeholder="0-10"
                      min={0}
                      max={10}
                    />
                    <button
                      type="button"
                      className="btn btn-increment"
                      onClick={() => {
                        const newCategories = [...categories];
                        const catIndex = newCategories.findIndex(
                          (c) => c.id === category.id
                        );
                        const ratingIndex = newCategories[
                          catIndex
                        ].ratings.findIndex((r) => r.id === rating.id);
                        newCategories[catIndex].ratings[
                          ratingIndex
                        ].value += 0.5;
                        setCategories(newCategories);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <input
                    className="rating-item-child emoji"
                    type="text"
                    value={rating.emoji}
                    onChange={(e) => {
                      const newCategories = [...categories];
                      const catIndex = newCategories.findIndex(
                        (c) => c.id === category.id
                      );
                      const ratingIndex = newCategories[
                        catIndex
                      ].ratings.findIndex((r) => r.id === rating.id);
                      newCategories[catIndex].ratings[ratingIndex].emoji =
                        e.target.value;
                      setCategories(newCategories);
                    }}
                    placeholder={CHICKEN_EMOJIS.full}
                    maxLength={1}
                  />
                </div>
              ))}
              {category.text && (
                <button
                  type="button"
                  onClick={() => {
                    const newCategories = [...categories];
                    const catIndex = newCategories.findIndex(
                      (c) => c.id === category.id
                    );

                    newCategories[catIndex].ratings.push(getNewRatingItem());
                    setCategories(newCategories);
                  }}
                >
                  Add Rating
                </button>
              )}
            </Container>
          );
        })}
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
            #<input type="text" value={hashtag} disabled />
            <button className="btn" onClick={() => removeHashtag(hashtag)}>
              -
            </button>
          </div>
        );
      })}
      <div className="hashtag">
        #<input type="text" value={CONSTANT_HASHTAGS[0]} disabled />
      </div>
      <div className="hashtag">
        #<input type="text" value={CONSTANT_HASHTAGS[1]} disabled />
      </div>
    </div>
  );
}

function deleteCategory(categoryId: string) {}

// Hit + button
function addExtraCategory() {}

function QuestionSlider() {}

function calculateCategoryRatings(ratings: RatingType[]) {
  const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
  const average = total / ratings.length;
  return average;
}

function calculateOverallRating(categories: CategoryType[]) {
  const total = categories.reduce((acc, category) => acc + category.value, 0);
  const average = total / categories.length;
  return average;
}
