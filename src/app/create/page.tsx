"use client";

import { use, useState } from "react";
import { BASE_CATEGORIES } from "@/app/types/category.types";
import type { RatingType, CategoryType } from "@/app/types/category.types";
import { CHICKEN_EMOJIS, CONSTANT_HASHTAGS } from "../reviews/[id]/page";
import { useRouter } from "next/navigation";
import "./createPage.css";

export default function CreateNewReview() {
  // TODO: if not signed in, redirect to login page

  const [restName, setRestName] = useState("");
  const [sandName, setSandName] = useState("");
  const [intro, setIntro] = useState("");
  const [mainCategories, setMainCategories] = useState(BASE_CATEGORIES);
  const [extraCategories, setExtraCategories] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [existingHashTags, setExistingHashTags] = useState<string[]>([]); // ...Constant Hashtags
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isInTheMiddleOfSomething, setIsInTheMiddleOfSomething] =
    useState(false);

  const router = useRouter();

  async function create(e) {
    console.log(`[CreateReview][onSubmit]`, {
      restName,
      sandName,
      intro,
      mainCategories,
      extraCategories,
      remarks,
      existingHashTags,
    });

    [restName, sandName, intro, remarks].forEach((text) => {
      if (!text) {
        e.preventDefault();
        throw new Error(`[CreateReview][onSubmit] - text is empty`);
      }
    });

    existingHashTags.forEach((tag) => {
      if (!tag) {
        e.preventDefault();
        throw new Error(`[CreateReview][onSubmit] - tag is empty`);
      }
    });

    await fetch("http://127.0.0.1:8090/api/collections/reviews/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restName,
        sandName,
        intro,
        mainCategories,
        extraCategories,
        remarks,
        existingHashTags,
      }),
    });

    setRestName("");
    setSandName("");
    setIntro("");
    setMainCategories(BASE_CATEGORIES);
    setExtraCategories([]);
    setRemarks("");
    setExistingHashTags([]);

    router.refresh();
  }

  function doAddCategory() {
    setIsInTheMiddleOfSomething(true);
    setIsAddingCategory(true);
  }

  return (
    <form
      onSubmit={create}
      className={`create-review-form${
        isInTheMiddleOfSomething ? " disabled" : ""
      }`}
    >
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
        {mainCategories.map((category) => (
          <Container key={`category-${category.id}`} className="category">
            <span className="form-label">{category.text} ⇒ </span>
            {category.ratings.map((rating) => (
              <RatingItem key={`${rating.id}`} {...rating} />
            ))}
          </Container>
        ))}
        <AddButton
          isOnScreen={isAddingCategory}
          startAddFunction={doAddCategory}
          elementToDisplay={
            <Container className="modal">
              Add Category
              <button
                type="button"
                className="btn btn-done"
                onClick={() => setIsAddingCategory(false)}
              >
                Done
              </button>
            </Container>
          }
        />
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

function RatingItem(rating: RatingType) {
  const [ratingName, setRatingName] = useState(rating.text);
  const isMainCategory = rating.text.length > 0;
  const [ratingValue, setRatingValue] = useState(rating.value);
  const [emoji, setEmoji] = useState(rating.emoji);

  function incrementRating(value: number) {
    if (ratingValue + value < 0) setRatingValue(0);
    if (ratingValue + value > 10) setRatingValue(10);
    else setRatingValue(ratingValue + value);
  }

  return (
    <div className="rating-item">
      <div className="rating-item-child name">
        {!isMainCategory && (
          <div className="rating-item-child new-rating">
            <span>[rating][name] ⇒ </span>
            <input
              type="text"
              value={ratingName}
              onChange={(e) => setRatingName(e.target.value)}
              placeholder="What are you rating for?"
              disabled={rating.text.length > 0}
            />
          </div>
        )}
        {isMainCategory && <span>{ratingName}</span>}
      </div>
      <div className="rating-item-child value">
        <button
          type="button"
          className="btn btn-increment"
          onClick={() => incrementRating(-0.5)}
        >
          -
        </button>
        <input
          id={`rating-${rating.id}`}
          type="number"
          value={ratingValue}
          onChange={(e) => setRatingValue(parseFloat(e.target.value))}
          placeholder="0-10"
          min={0}
          max={10}
        />
        <button
          type="button"
          className="btn btn-increment"
          onClick={() => incrementRating(0.5)}
        >
          +
        </button>
      </div>
      <input
        className="rating-item-child emoji"
        type="text"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
        placeholder={CHICKEN_EMOJIS.full}
        maxLength={1}
      />
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
