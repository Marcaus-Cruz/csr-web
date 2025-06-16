"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { removeDuplicateHits } from "../lib/hitlistUtils";
import {
  COLLECTION_USER,
  getLocalHitlist,
  getLocalId,
  setLocalHitlist,
} from "../lib/pocketbase";
import { isLoggedIn } from "../lib/withAuth";
import type { Hit, Hitlist } from "../types/hitlist.types";
import "./hitlist.css";

async function writeToHitlist(statefulHitlist: Hitlist) {
  console.log(`[Hitlist][${writeToHitlist.name}]`, { statefulHitlist });

  if (isLoggedIn()) {
    const userId = getLocalId();
    const updatedHitlist = removeDuplicateHits(statefulHitlist);

    return await COLLECTION_USER.update(userId, {
      hitlist: updatedHitlist,
    });
  } else {
    console.warn("No user is logged in...");
    return Promise.resolve();
  }
}

export default function HitListEdit() {
  const ownerHitlist = removeDuplicateHits(getLocalHitlist());

  const [hitlist, setHitlist] = useState<Hitlist>(ownerHitlist);
  const [isAdding, setIsAdding] = useState(false);
  const [newHitlistItem, setNewHitlistItem] = useState<Hit>({
    id: uuid(),
    name: "",
  });

  return (
    <div className="hitlist edit">
      <h1>Hitlist</h1>
      {!isAdding && (
        <button
          className="btn add"
          onClick={() => {
            setIsAdding(true);
          }}
        >
          Add to hitlist
        </button>
      )}
      <ul>
        {isAdding && (
          <div className="hitlist-item new">
            <input
              name="new-hitlist-item"
              type="text"
              placeholder="Add to hitlist"
              className="typewriter"
              value={newHitlistItem.name}
              onChange={(event) =>
                setNewHitlistItem((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
            />
            <button
              className="btn"
              onClick={async () => {
                if (newHitlistItem.name) {
                  const newHitlist = [...hitlist, newHitlistItem];

                  setHitlist(newHitlist);
                  setLocalHitlist(newHitlist);

                  await writeToHitlist(newHitlist);
                }
                setIsAdding(false);
                setNewHitlistItem({ id: uuid(), name: "" });
              }}
            >
              Confirm
            </button>
          </div>
        )}
        {hitlist.map((placeToHit) => (
          <div key={`item-${placeToHit.id}`} className="hitlist-item">
            <div key={placeToHit.id}>{placeToHit.name}</div>
            <button
              className="btn"
              onClick={async () => {
                const newHitlist = hitlist.filter(
                  (item) => item.id !== placeToHit.id
                );
                setHitlist(newHitlist);
                await writeToHitlist(newHitlist);
              }}
            >
              Mark as Hit
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
