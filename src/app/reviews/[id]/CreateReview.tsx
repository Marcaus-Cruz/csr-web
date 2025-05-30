"use client";

import { useState } from "react";
import { BASE_CATEGORIES } from "@/app/types/category.types";
import type { RatingType, CategoryType } from "@/app/types/category.types";
import { CHICKEN_EMOJIS, CONSTANT_HASHTAGS } from "./page";

export default function CreateNewReview() {
  const [restName, setRestName] = useState("");
  const [sandName, setSandName] = useState("");
  const [intro, setIntro] = useState("");
  const [mainCategories, setMainCategories] = useState(BASE_CATEGORIES);
  const [extraCategories, setExtraCategories] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [existingHashTags, setExistingHashTags] = useState<string[]>([]); // ...Constant Hashtags

  return (
    <form>
      <HashtagSection
        existingHashTags={existingHashTags}
        setExistingHashTags={setExistingHashTags}
      />
    </form>
  );
}

function HashtagSection({ existingHashTags, setExistingHashTags }) {
  const [isAddingHashtag, setIsAddingHashtag] = useState(false);
  const [newHashtag, setNewHashtag] = useState("");

  function saveHashtag() {
    if (newHashtag.trim() === "") {
      setIsAddingHashtag(false);
      return;
    }
    setExistingHashTags([...existingHashTags, newHashtag]);
    setIsAddingHashtag(false);
  }

  function removeHashtag(hashtag: string) {
    setExistingHashTags(existingHashTags.filter((h) => h !== hashtag));
  }

  return (
    <div className="hashtags">
      {!isAddingHashtag && (
        <button onClick={() => setIsAddingHashtag(true)}>+</button>
      )}
      {isAddingHashtag && (
        <div className="hashtag new-hashtag">
          #
          <input
            type="text"
            value={newHashtag}
            onChange={(e) => setNewHashtag(e.target.value)}
          />
          <button onClick={() => saveHashtag()}>Done</button>
        </div>
      )}
      {existingHashTags.map((hashtag) => {
        return (
          <div key={hashtag} className="hashtag">
            #<input type="text" value={hashtag} disabled />
            <button onClick={() => removeHashtag(hashtag)}>delete</button>
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
        <span>Name:</span>
        <input
          type="text"
          value={ratingName}
          onChange={(e) => setRatingName(e.target.value)}
          placeholder="What are you rating for?"
        />
      </div>
      <div className="rating-item-child value">
        <span className="flex100perc">Value:</span>
        <button
          className="btn btn-increment"
          onClick={() => incrementRating(-0.5)}
        >
          -
        </button>
        <input
          type="number"
          value={ratingValue}
          onChange={(e) => setRatingValue(parseFloat(e.target.value))}
          placeholder="0-10"
        />
        <button
          className="btn btn-increment"
          onClick={() => incrementRating(0.5)}
        >
          +
        </button>
        <input
          className="emoji flex100perc"
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder={CHICKEN_EMOJIS.full}
        />
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
