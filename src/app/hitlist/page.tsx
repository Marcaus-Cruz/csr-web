"use client";

import PocketBase from "pocketbase";
import { useState } from "react";
import { isLoggedIn } from "../lib/withAuth";
import "./hitlist.css";

const pb = new PocketBase("http://127.0.0.1:8090"); // TODO: Make this an exportable const

async function writeToHitlist(statefulHitlist: string[]) {
  console.log(`[Hitlist][${writeToHitlist.name}]`, { statefulHitlist });

  if (isLoggedIn()) {
    const userId = pb.authStore.record?.id ?? "";
    const user = await pb.collection("users").getOne(userId);
    const updatedHitlist = [...(user.hitlist ?? []), ...statefulHitlist];

    console.warn(`[Hitlist][${writeToHitlist.name}][ADD]`, {
      user,
      userId,
      updatedHitlist,
    });

    return await pb
      .collection("users")
      .update(userId, { hitlist: updatedHitlist });
  } else {
    console.warn("No user is logged in...");
    return Promise.resolve();
  }
}

export default function HitListEdit() {
  const ownerHitlist = pb.authStore.record?.hitlist ?? [];
  console.log(`[Hitlist]`, { ownerHitlist });

  const [hitlist, setHitlist] = useState(ownerHitlist);
  const [isAdding, setIsAdding] = useState(false);
  const [newHitlistItem, setNewHitlistItem] = useState("");

  return (
    <div className="hitlist edit">
      <h1>Hitlist</h1>
      <ul>
        {hitlist.map((placeToHit) => (
          <div key={`item-${placeToHit}`} className="hitlist-item">
            <div key={placeToHit}>{placeToHit}</div>
            <button className="btn">Mark as Hit</button>
          </div>
        ))}
        {isAdding && (
          <div className="hitlist-item new">
            <input
              type="text"
              placeholder="Add to hitlist"
              className="typewriter"
              value={newHitlistItem}
              onChange={(event) => setNewHitlistItem(event.target.value)}
            />
            <button
              className="btn"
              onClick={async () => {
                // TODO: Save to PocketBase

                setHitlist([...hitlist, newHitlistItem]);
                await writeToHitlist(hitlist);
                setIsAdding(false);
                setNewHitlistItem("");
              }}
            >
              Confirm
            </button>
          </div>
        )}
      </ul>
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
    </div>
  );
}
